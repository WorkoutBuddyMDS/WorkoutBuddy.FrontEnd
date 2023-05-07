import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';

export default function ViewExercise({ exerciseId }) {
  const [exercise, setExercises] = useState({ muscleGroups: [] });
  const router = useRouter();

  useEffect(() => {
    const getExercise = async (exerciseId) => {
      if (typeof window !== 'undefined') {
        console.log('da');
        const { data } = await axios.get(
          `https://localhost:7132/Exercises/view?id=${exerciseId}`,
          {
            headers: {
              Authorization: AuthHeader(),
            },
          }
        );
        setExercises(data);
      }
    };

    getExercise(exerciseId);
  }, []);
  return (
    <Container maxWidth={'xl'}>
      <Grid
        sx={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '24px 0 ',
        }}
      >
        <Grid item>
          <img
            alt={'product image'}
            // src={`https://localhost:7132/Image/getImageById?id=${exerciseId}`}
            style={{
              backgroundRepeat: 'fit',
              textAlign: 'center',
              width: '100%',
              height: '500px',
            }}
          />
        </Grid>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>
            <Typography
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {exercise.name}
            </Typography>
            <Typography fontWeight={300} fontSize={'2xl'}>
              {exercise.exerciseType}
            </Typography>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<Divider />}
          >
            <Stack direction="row" spacing={{ base: 4, sm: 6 }}>
              <Typography fontSize={'2xl'} fontWeight={'300'}>
                {exercise.description}
              </Typography>
            </Stack>
            <Box>
              <Typography
                fontSize={{ base: '16px', lg: '18px' }}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Muscles Targeted
              </Typography>
              <Grid columns={{ base: 1, md: 2 }} spacing={10}>
                <List>
                  {exercise.muscleGroups.map((mg, index) => {
                    return <ListItem key={index}>{mg}</ListItem>;
                  })}
                </List>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get('https://localhost:7132/Exercises/get');
  console.log(data);

  const paths = data.map((exercise) => ({
    params: { id: exercise.exerciseId.toString() },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      exerciseId: context.params.id,
    },
  };
}
