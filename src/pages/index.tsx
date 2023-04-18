import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

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

export default Index;
