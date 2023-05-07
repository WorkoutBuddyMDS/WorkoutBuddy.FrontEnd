import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/navigation';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Exercise({ exercise, deleteHandler: deleteExercises }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    var roles = sessionStorage.getItem('roles');
    if (roles) {
      setIsAdmin(roles.includes('Admin'));
    }
  }, []);

  const viewHandler = (exerciseId) => {
    router.push(`/exercises/${exerciseId}`);
  };

  const editHandler = (exerciseId) => {
    router.push(`/exercises/insert-exercise?id=${exerciseId}`);
  };

  const deleteHandler = async (exerciseId) => {
    let res = confirm('Are you sure you want to delete this exercise?');
    if (res) {
      try {
        await axios.post('https://localhost:7132/Exercises/delete', {
          data: exerciseId,
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthHeader(),
          },
        });
        deleteExercises(exerciseId);
      } catch (err) {}
    }
  };

  console.log(exercise);

  return (
    <Grid item xs={12} md={4} width="100%">
      <Grid container py={12}>
        <Box
          sx={{
            padding: '30px',
            maxWidth: '330px',
            width: 'full',
            backgroundColor: 'lightgray',
            position: 'relative',
            zIndex: '1',
          }}
        >
          <Box
            sx={{ position: 'relative', height: '230px', marginTop: '-20px' }}
          >
            <img
              height={230}
              width={282}
              src={`https://localhost:7132/Image/getImageById?id=${exercise.idImage}`}
              alt={exercise.idImage}
            />
          </Box>
          <Stack sx={{ paddingTop: '20px', textAlign: 'center' }}>
            <Typography
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              {exercise.exerciseType}
            </Typography>
            <Typography variant={'h2'} fontFamily={'body'} fontWeight={500}>
              {exercise.name}
            </Typography>
          </Stack>
          <Stack mt={8} direction={'row'} spacing={4}>
            <Link
              style={{ flex: '1 1 0', fontSize: '10px' }}
              href={`exercises/${exercise.exerciseId.toString()}`}
            >
              View
            </Link>
            {isAdmin && (
              <>
                <Button
                  sx={{
                    flex: '1 1 0',
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: 'blue',
                    boxShadow:
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                  }}
                  onClick={(e) => editHandler(exercise.exerciseId)}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    flex: '1 1 0',
                    fontSize: '10px',
                    color: 'white',
                    backgroundColor: 'red',
                    boxShadow:
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                  }}
                  onClick={(e) => deleteHandler(exercise.exerciseId)}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
