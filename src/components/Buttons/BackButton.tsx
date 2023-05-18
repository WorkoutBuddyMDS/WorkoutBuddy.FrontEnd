import React from 'react';
import Button from '@mui/material/Button';
import { ArrowLeft } from '@mui/icons-material';
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import useText from '@/services/site-properties/parsing';

const BackButton = (props: any) => {
  const navigation = useNavigation();
  const { locale } = useRouter();

  const text = {
    backText: useText('general.back.text', locale),
  };
  return (
    <Button {...props} variant="text" onClick={navigation.back}>
      <ArrowLeft />
      {text.backText}
    </Button>
  );
};

export default BackButton;
