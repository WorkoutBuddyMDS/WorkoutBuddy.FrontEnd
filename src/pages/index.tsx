import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '@/store/reducers/account';

const StyledTypography = styled(Typography)(
  ({ theme }) =>
    `margin-left: 10px;
color: ${theme.palette.colorText.alternative};

font-size: 30px;`
);
const Index = () => {
  const router = useRouter();
  const username = useRef<string>();

  useEffect(() => {
    if (window.sessionStorage) {
      if (Object.keys(AuthHeader()).length === 0) {
        router.push('/login');
      } else {
        username.current = sessionStorage.getItem('username');
      }
    }
  }, []);
  return (
    <>
      <StyledTypography>Hello {username.current || 'Next'}</StyledTypography>
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Index;
