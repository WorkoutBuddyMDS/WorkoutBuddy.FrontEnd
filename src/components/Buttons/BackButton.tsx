import React from 'react';
import Button from '@mui/material/Button';
import { ArrowLeft } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant="text" onClick={router.back}>
      <ArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
