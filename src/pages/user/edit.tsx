import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Select,
  Container,
  Typography,
} from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import AuthHeader from '@/utils/authrorizationHeader';
import dayjs from 'dayjs';
import { BasicLoader } from '@/components/Loader/BasicLoader';
import BasicAlert from '@/components/Alerts/BasicAlert';
import { beforeMain } from '@popperjs/core';
import useText from '@/services/site-properties/parsing';
import { useRouter } from 'next/router';

const EditUserPage = () => {
  const { locale } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    birthDate: dayjs(Date.now()),
    roles: [],
    currentWeight: 0,
  });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          'https://localhost:7132/UserAccount/profilePage',
          {
            headers: {
              Authorization: AuthHeader(),
            },
          }
        );
        console.log(data);
        setUser({ ...data, birthDate: dayjs(data.birthDate) });
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, []);

  const text = {
    name: useText('general.name.placeholder.text', locale),
    username: useText('general.username.placeholder.text', locale),
    email: useText('general.email.placeholder.text', locale),
    password: useText('general.password.placeholder.text', locale),
    dateOfBirth: useText('general.date-of-birth.placeholder.text', locale),
    weight: useText('general.weight.placeholder.text', locale),
    roles: useText('pages.admin.users.table.roles', locale),
    save: useText('general.save.text', locale),
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    try {
      await axios.post(
        'https://localhost:7132/UserAccount/editProfile',
        {
          username: user.username,
          name: user.name,
          email: user.email,
          birthDate: user.birthDate,
        },
        {
          headers: {
            Authorization: AuthHeader(),
          },
        }
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BasicLoader open={loading} />
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            margin: '80px 0 40px',
            textAlign: 'center',
          }}
          variant="h3"
        >
          Edit your profile
        </Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label={text.name}
            name="name"
            autoComplete="name"
            autoFocus
            value={user.name}
            onChange={(e) =>
              setUser((prevState) => ({ ...prevState, name: e.target.value }))
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={text.username}
            name="username"
            autoComplete="username"
            value={user.username}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={text.email}
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) =>
              setUser((prevState) => ({ ...prevState, email: e.target.value }))
            }
          />
          <DatePicker
            sx={{ width: '100%' }}
            label={text.dateOfBirth}
            value={user.birthDate}
            onChange={(e) => {
              if (e) {
                setUser((prevState) => ({
                  ...prevState,
                  birthDate: e,
                }));
              }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="weight"
            label={text.weight}
            name="weight"
            autoComplete="weight"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            disabled
            value={user.currentWeight}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="roles"
            label={text.roles}
            name="roles"
            autoComplete="roles"
            value={user.roles.join(', ')}
            disabled
          />
          <Button
            sx={{ margin: '20px auto' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {text.save}
          </Button>
        </form>
      </Container>
      {error && <BasicAlert message={error} alert={{ severity: 'error' }} />}
    </>
  );
};

EditUserPage.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditUserPage;
