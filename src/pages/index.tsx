import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Box, Button } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import { MuscleIcon } from '@/components/Icons/MuscleIcon';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Copyright from '@/components/Copyright/Copyright';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useText from '@/services/site-properties/parsing';

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
  const { locale } = useRouter();
  const [username, setUsername] = useState<string | null>('');

  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
  }, []);

  const text = {
    title: useText('pages.home.index.title.text', locale),
    subtitle: useText('pages.home.index.subtitle.text', locale),
    welcome: useText('pages.home.index.welcome.text', locale),
    getStarted: useText('pages.home.index.button.started', locale),
    beginnerTitle: useText('pages.home.index.section.beginner.title', locale),
    beginnerText: useText('pages.home.index.section.beginner.text', locale),
    experiencedTitle: useText(
      'pages.home.index.section.experienced.title',
      locale
    ),
    experiencedText: useText(
      'pages.home.index.section.experienced.text',
      locale
    ),
    allAgesTitle: useText('pages.home.index.section.allages.title', locale),
    allAgesText: useText('pages.home.index.section.allages.text', locale),
  };
  return (
    <>
      <BlackBackgroundSection>
        <Typography variant="h5">{text.title}</Typography>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {text.subtitle}
        </Typography>
        <MuscleIcon />
        {username ? (
          <Typography variant="h4">
            {text.welcome}
            {username}
          </Typography>
        ) : (
          <Link href="/login">
            <Button variant="contained">{text.getStarted}</Button>
          </Link>
        )}
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
          <Typography variant="h6">{text.beginnerTitle}</Typography>
          <p>{text.beginnerText}</p>
        </DetailSection>
        <DetailSection>
          <FitnessCenterIcon
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6">{text.experiencedTitle}</Typography>
          <p>{text.experiencedText}</p>
        </DetailSection>
        <DetailSection>
          <MonitorHeartIcon
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6">{text.allAgesTitle}</Typography>
          <p>{text.allAgesText}</p>
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
