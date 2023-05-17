import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import useText from '@/services/site-properties/parsing';

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

  const { locale } = useRouter();
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

  const text = {
    name: useText('general.name.placeholder.text', locale),
    description: useText('general.description.placeholder.text', locale),
    typeOfExercise: useText(
      'pages.exercises.insert.type-of-exercises.text',
      locale
    ),
    groupsOfMuscles: useText(
      'pages.exercises.insert.groups-of-muscles.text',
      locale
    ),
    image: useText('general.image.placeholder.text', locale),
    submit: useText('general.submit.text', locale),
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
                label={text.name}
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
                label={text.description}
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
                  label={text.typeOfExercise}
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
                  label={text.groupsOfMuscles}
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
                  setExercise({ ...exercise, image: e.target.files[0] });
                }}
                placeholder={text.image}
                type="file"
              />
            </Grid>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                sx={{ backgroundColor: 'blue', color: 'white', width: 'full' }}
                onClick={submitHandler}
              >
                {text.submit}
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
