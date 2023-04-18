import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';

const StyledTypography = styled(Typography)(
  ({ theme }) => `
  margin-left: 10px;
  color: ${theme.palette.colorText.alternative};
  
  font-size: 30px;
`
);
const Index = () => {
  return <StyledTypography>Hello Next</StyledTypography>;
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Index;
