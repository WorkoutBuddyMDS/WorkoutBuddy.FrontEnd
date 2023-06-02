import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import { BasicLoader } from '@/components/Loader/BasicLoader';
import BackButton from '@/components/Buttons/BackButton';
import Link from 'next/link';
import useText from '@/services/site-properties/parsing';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IExercise {
  name: string;
  description: string;
  idImage: string;
  exerciseType: string;
  muscleGroups: string[];
}

function ViewExercise() {
  const [exercise, setExercise] = useState<IExercise>();
  const [_error, setError] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const locale = useSelector((state: RootState) => state.language.language);
  const { exerciseId } = router.query;

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://localhost:7132/Exercises/delete', {
        body: JSON.stringify(exerciseId),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status < 300) router.back();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getExercise = async (exerciseId: string) => {
      try {
        const { data } = await axios.get(
          `https://localhost:7132/Exercises/view?id=${exerciseId.toString()}`,
          {
            headers: {
              Authorization: AuthHeader(),
            },
          }
        );
        setExercise(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof exerciseId === 'string') {
      getExercise(exerciseId);
    }
  }, [exerciseId]);

  const text = {
    musclesTargeted: useText('pages.exercises.exercise.muscles', locale),
    modalTitle: useText('pages.exercises.exercise.modal.title', locale),
    modalContent: useText('pages.exercises.exercise.modal.content', locale),
    edit: useText('general.edit.text', locale),
    delete: useText('general.delete.text', locale),
    cancel: useText('general.modal.text.cancel', locale),
  };
  return (
    <>
      <BasicLoader open={loading} />
      <BackButton />
      <Container maxWidth="lg" sx={{ mt: 20 }}>
        <Card
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography component="div" variant="h5" sx={{ mb: 1 }}>
              {exercise?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {exercise?.exerciseType}
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {exercise?.description}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {text.musclesTargeted}
              </Typography>
              <Grid container spacing={2}>
                {exercise?.muscleGroups.map((mg, index) => (
                  <Grid item key={index}>
                    <Avatar
                      variant="rounded"
                      sx={{ bgcolor: 'secondary.main' }}
                    >
                      {mg.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {mg}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
          {exerciseId && (
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                minWidth: 300,
                maxWidth: '50%',
              }}
            >
              <img
                width="100%"
                src={`https://localhost:7132/Image/getImageById?id=${exercise?.idImage}`}
                alt={exercise?.name}
              />
            </Box>
          )}
        </Card>
        <Link href={`/exercises/insert?id=${exerciseId}`}>
          <Button variant="outlined">{text.edit}</Button>
        </Link>
        <Button variant="contained" color="error" onClick={handleOpen}>
          {text.delete}
        </Button>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{text.modalTitle}</DialogTitle>
        <DialogContent>{text.modalContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{text.cancel}</Button>
          <Button onClick={handleDelete} autoFocus>
            {text.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ViewExercise.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default ViewExercise;
