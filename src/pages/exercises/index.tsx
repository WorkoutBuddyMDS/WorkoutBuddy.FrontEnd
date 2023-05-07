import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthHeader from '@/utils/authrorizationHeader';
import Exercise from '@/components/Exercises/Exercise';
import { useRouter } from 'next/router';
import { Button, Box, Typography, Grid } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';

const ExercisesList = () => {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get('https://localhost:7132/Exercises/get', {
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setExercises(data);
    };
    getExercises();
  }, []);

  const addHandler = () => {
    router.push('/exercises/insert-exercise');
  };
  const deleteHandler = (exerciseId: string) => {
    const newExercises = exercises.filter((ex) => ex.exerciseId != exerciseId);
    setExercises(newExercises);
  };

  return (
    <Box
      sx={{
        margin: '30px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        style={{
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Typography variant="h2">Exercises: </Typography>
        <Button
          variant={'contained'}
          style={{ backgroundColor: '#d4f0a5' }}
          onClick={addHandler}
        >
          Add new exercise
        </Button>
      </Box>

      <Grid container>
        {exercises.map((ex) => {
          return (
            <Exercise
              key={ex.exerciseId}
              exercise={ex}
              deleteHandler={deleteHandler}
            ></Exercise>
          );
        })}
      </Grid>
    </Box>
  );
};

ExercisesList.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default ExercisesList;
