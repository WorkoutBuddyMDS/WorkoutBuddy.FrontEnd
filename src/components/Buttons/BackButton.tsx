import React from 'react';
import Button from '@mui/material/Button';
import { ArrowLeft } from '@mui/icons-material';
import { useRouter as useNavigation } from 'next/navigation';
import useText from '@/services/site-properties/parsing';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const BackButton = (props: any) => {
  const navigation = useNavigation();
  const locale = useSelector((state: RootState) => state.language.language);

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
