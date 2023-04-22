import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
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

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Index;
