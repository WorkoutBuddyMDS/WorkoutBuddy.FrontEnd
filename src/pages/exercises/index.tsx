import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthHeader from '@/utils/authrorizationHeader';
import Exercise from '@/components/Exercises/Exercise';
import { useRouter } from 'next/router';
import { Button, Box, Typography, Grid } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import useText from '@/services/site-properties/parsing';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export interface IExerciseItem {
  exerciseId: string;
  idImage: string;
  name: string;
  exerciseType: string;
}
const ExercisesList = () => {
  const router = useRouter();
  const locale = useSelector((state: RootState) => state.language.language);
  const [exercises, setExercises] = useState<IExerciseItem[]>([]);

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
    router.push('/exercises/insert');
  };
  const deleteHandler = (exerciseId: string) => {
    const newExercises = exercises.filter((ex) => ex.exerciseId != exerciseId);
    setExercises(newExercises);
  };

  const text = {
    exercisesTitle: useText('pages.exercises.index.title', locale),
    addText: useText('pages.exercises.index.button.add', locale),
    view: useText('general.view.text', locale),
    delete: useText('general.delete.text', locale),
    edit: useText('general.edit.text', locale),
    confirmDelete: useText('pages.exercises.index.card.confirm', locale),
    typeExercises: useText(
      'pages.exercises.insert.type-of-exercises.text',
      locale
    ),
    nameExercise: useText(
      'pages.admin.pending-exercises.name-exercise.text',
      locale
    ),
    muscalarGroups: useText(
      'pages.exercises.insert.groups-of-muscles.text',
      locale
    ),
    imagePlaceholder: useText('general.image.placeholder.text', locale),
    submitText: useText('general.submit.text', locale),
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
        <Typography variant="h2">{text.exercisesTitle}</Typography>
        <Button
          variant={'contained'}
          style={{ backgroundColor: '#d4f0a5' }}
          onClick={addHandler}
        >
          {text.addText}
        </Button>
      </Box>

      <Grid container>
        {exercises.map((ex) => {
          return (
            <Exercise
              text={text}
              key={ex.exerciseId}
              exercise={ex}
              deleteExercises={deleteHandler}
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
