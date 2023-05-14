import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
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

  console.log(exercise);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    let querryString = `?selectedType.value=${exercise.selectedType.value}&selectedType.label=${exercise.selectedType.label}`
    
    formData.append("exerciseId", exercise.exerciseId);
    formData.append("name", exercise.name);
    formData.append("description", exercise.description);
    formData.append("selectedType", exercise.selectedType);
    let index = 0;
    debugger;
    for(let mg of exercise.selectedMuscleGroups){
      formData.append("selectedMuscleGroups", mg);
      querryString += `&selectedMuscleGroups[${index}].value=${mg.value}`
      querryString += `&selectedMuscleGroups[${index}].label=${mg.label}`
      index++;
    }
    formData.append("image", exercise.image);
    
    

    try {
      await axios({
        method: "post",
        url: `https://localhost:7132/Exercises/insertExercise${querryString}`,
        data: formData,
        headers: {
          Authorization: AuthHeader(),
          "Content-Type": "multipart/form-data"
        },
      });
      router.push("/exercises");
    } catch (err){
      console.log("treat errs")
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '5px',
        }}
      >
        <Typography variant={'h2'}>Insert Exercise</Typography>

        <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid
            container
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: '12px',
            }}
          >
            <Grid item xs={12}>
              <TextField
                value={exercise.name}
                onChange={(e) =>
                  setExercise({ ...exercise, name: e.target.value })
                }
                required
                fullWidth
                label="Name"
                id="name"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={exercise.description}
                onChange={(e) =>
                  setExercise({ ...exercise, description: e.target.value })
                }
                multiline
                rows={5}
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{ marginLeft: '14px' }}
                  variant="standard"
                  id="type-of-exercise"
                >
                  Type of exercise
                </InputLabel>
                <Select
                  labelId="type-of-exercise"
                  id="type-of-exercise"
                  label="Type of exercise"
                  value={exercise.selectedType?.label || ''}
                  onChange={(e) =>
                    setExercise({
                      ...exercise,
                      selectedType: {
                        label: e.target.value,
                        value: exercise.exerciseTypes.find(
                          (ex) => ex.label === e.target.value
                        )?.value,
                      },
                    })
                  }
                >
                  {exercise.exerciseTypes.map((exerciseType) => (
                    <MenuItem
                      value={exerciseType.label}
                      id={exerciseType.value}
                    >
                      {exerciseType.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  variant="standard"
                  id="groups-of-muscles"
                  sx={{ marginLeft: '14px' }}
                >
                  Groups of muscles
                </InputLabel>
                <Select
                  labelId="groups-of-muscles"
                  id="groups-of-muscles"
                  label="Groups of muscles"
                  multiple
                  value={
                    exercise.selectedMuscleGroups.map(
                      (muscle) => muscle.label
                    ) || []
                  }
                  onChange={(e) => {
                    const { value } = e.target;
                    const selectedMuscleGroups = value.map((label) => {
                      const muscleGroup = exercise.muscleGroups.find(
                        (muscle) => muscle.label === label
                      );
                      return {
                        label,
                        value: muscleGroup?.value ?? 0,
                      };
                    });
                    setExercise({
                      ...exercise,
                      selectedMuscleGroups,
                    });
                  }}
                >
                  {exercise.muscleGroups.map((muscleGroup) => (
                    <MenuItem key={muscleGroup.value} value={muscleGroup.label}>
                      {muscleGroup.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => {
                  // @ts-ignore
                  console.log(e.target);
                  setExercise({ ...exercise, image: e.target.files[0] });
                }}
                placeholder="Image"
                type="file"
              />
            </Grid>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                sx={{ backgroundColor: 'blue', color: 'white', width: 'full' }}
                onClick={submitHandler}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

InsertExercise.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default InsertExercise;
