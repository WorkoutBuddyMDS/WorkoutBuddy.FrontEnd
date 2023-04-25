import React from 'react';
import Button from '@mui/material/Button';
import { ArrowLeft } from '@mui/icons-material';

const BackButton = (props) => {
  return (
    <Button {...props} variant="text">
      <ArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
