import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import { Typography, Box, Button } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import AuthHeader from '@/utils/authrorizationHeader';
import { useRouter } from 'next/navigation';
import { MuscleIcon } from '@/components/Icons/MuscleIcon';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Copyright from '@/components/Copyright/Copyright';

const StyledTypography = styled(Typography)(
  ({ theme }) =>
    `margin-left: 10px;
color: ${theme.palette.colorText.alternative};

font-size: 30px;`
);

const StyledSection1 = styled(Box)`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledSection2 = styled(Box)`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const BlackBackgroundSection = styled(StyledSection1)`
  background-color: rgba(0, 0, 0, 0.25);
`;

const DetailSection = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 50px;
  text-align: center;
  max-width: 225px;
`;

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
      <BlackBackgroundSection>
        <Typography variant="h5">Workout your body</Typography>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Transform Your Body and Mind with Your Ultimate Fitness Companion
        </Typography>
        <MuscleIcon />
        <Button variant="contained">GET STARTED</Button>
      </BlackBackgroundSection>
      <StyledSection2 sx={{ marginTop: '-85px' }}>
        <DetailSection>
          <AccessibilityIcon
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6">Beginner</Typography>
          <p>
            We cater to all experience leverls. Don't be shy and see what you're
            missing
          </p>
        </DetailSection>
        <DetailSection>
          <FitnessCenterIcon
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6">Experienced</Typography>
          <p>
            We even have more intense workouts for the personal trainer in you.
          </p>
        </DetailSection>
        <DetailSection>
          <MonitorHeartIcon
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6">All ages</Typography>
          <p>
            We can train any age level. If you want to have a healthier
            lifestyle then call us today to find out more.
          </p>
        </DetailSection>
      </StyledSection2>
      <Box
        height="91px"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Copyright />
      </Box>
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Index;
