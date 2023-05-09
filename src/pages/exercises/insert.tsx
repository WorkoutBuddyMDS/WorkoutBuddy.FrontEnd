import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';

const exerciseInitialState = {
  exerciseId: '00000000-0000-0000-0000-000000000000',
  name: ' ',
  description: '',
  exerciseTypes: [],
  selectedType: {},
  muscleGroups: [],
  selectedMuscleGroups: [],
  image: '',
};

function InsertExercise() {
  const router = useRouter();
  const [exercise, setExercise] = useState(exerciseInitialState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params?.get('id');

    const getExercise = async () => {
      if (window.sessionStorage) {
        const { data } = await axios.get(
          `https://localhost:7132/Exercises/getExerciseForInsert?id=${
            id ?? '00000000-0000-0000-0000-000000000000'
          }`,
          {
            headers: {
              Authorization: AuthHeader(),
            },
          }
        );
        setExercise(data);
      }
    };

    getExercise();
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let formData = new FormData();

    // @ts-ignore
    let querryString = `?selectedType.value=${exercise.selectedType.value}&selectedType.label=${exercise.selectedType.label}`;

    formData.append('exerciseId', exercise.exerciseId);
    formData.append('name', exercise.name);
    formData.append('description', exercise.description);
    // @ts-ignore
    formData.append('selectedType', exercise.selectedType);
    let index = 0;
    debugger;
    for (let mg of exercise.selectedMuscleGroups) {
      formData.append('selectedMuscleGroups', mg);
      // @ts-ignore
      querryString += `&selectedMuscleGroups[${index}].value=${mg.value}`;
      // @ts-ignore
      querryString += `&selectedMuscleGroups[${index}].label=${mg.label}`;
      index++;
    }
    formData.append('image', exercise.image);

    try {
      await axios.post(
        `https://localhost:7132/Exercises/insertExercise${querryString}`,
        {
          data: formData,
          headers: {
            Authorization: AuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      router.push('/exercises');
    } catch (err) {
      console.log('treat errs');
    }
  };

  return (
    <Grid
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={{
          width: 'full',
          maxWidth: '75%',
          padding: '15px',
          margin: '30px 0',
        }}
      >
        <Typography variant={'h2'}>Insert Exercise</Typography>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
            placeholder="name"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <TextareaAutosize
            value={exercise.description}
            onChange={(e) =>
              setExercise({ ...exercise, description: e.target.value })
            }
            placeholder="description"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Exercise Types</FormLabel>
          <Select
            value={exercise.selectedType}
            onChange={(e) => setExercise({ ...exercise, selectedType: e })}
          >
            {exercise.exerciseTypes.map((exerciseType) => (
              <MenuItem>{exerciseType}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Muscle groups</FormLabel>
          <Select
            value={exercise.selectedMuscleGroups}
            onChange={(e) => {
              // @ts-ignore
              setExercise({ ...exercise, selectedMuscleGroups: e });
            }}
            multiple
          >
            {exercise.muscleGroups.map((muscleGroup) => (
              <MenuItem>{muscleGroup}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          required={
            exercise.exerciseId == '00000000-0000-0000-0000-000000000000'
          }
        >
          <FormLabel>Image</FormLabel>
          <Input
            onChange={(e) => {
              // @ts-ignore
              setExercise({ ...exercise, image: e.target.files[0] });
            }}
            placeholder="description"
            type="file"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            sx={{ backgroundColor: 'blue', color: 'white', width: 'full' }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

InsertExercise.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default InsertExercise;
