import NavigationLayout from '@/components/Layouts/NavigationLayout';
import SplitCard from '@/components/Splits/SplitCard';
import AuthHeader from '@/utils/authrorizationHeader';
import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

export interface ISplit {
    splitId: string,
    name: string,
    description: string,
    workoutsNo: number,
    workouts: string[],
    rating: number,
    creatorName: string
}

const SplitsList = () => {
  const router = useRouter();
  const [splits, setSplits] = useState([] as ISplit[]);

  useEffect(() => {
    const getSplits = async () => {
      const { data } = await axios.get(
        'https://localhost:7132/Split/getSplits',
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
      setSplits(data);
    };
    getSplits();
  }, []);

  const addHandler = () => {
    router.push('/splits/insert-split');
  };

  return (
    <Box
      sx={{
        margin: 5,
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
        <Typography variant="h3" component="h2">
          Splits:
        </Typography>
        <Button
          sx={{ backgroundColor: '#d4f0a5' }}
          onClick={addHandler}
        >
          Add new split
        </Button>
      </Box>

      <Stack>
        {splits.map((split) => {
          return <SplitCard key={split.splitId} split={split}></SplitCard>;
        })}
      </Stack>
    </Box>
  );
};

SplitsList.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default SplitsList;
