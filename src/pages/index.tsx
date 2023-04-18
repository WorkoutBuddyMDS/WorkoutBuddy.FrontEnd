import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import BasicAlert from '@/components/Alerts/BasicAlert';

const StyledTypography = styled(Typography)(
  ({ theme }) => `
  margin-left: 10px;
  color: ${theme.palette.colorText.alternative};
  
  font-size: 30px;
`
);
const Index = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <StyledTypography>Hello Next</StyledTypography>
      <BasicAlert open={open} setOpen={setOpen} />
    </>
  );
};

export default Index;
