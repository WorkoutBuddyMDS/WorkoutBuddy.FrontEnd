import { Typography } from '@mui/material';
import { StyledLink } from '@/styles/styled-components';
import React from 'react';
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <StyledLink href="http:www.workoutbuddy.ro:3000">
        Workout Buddy
      </StyledLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
