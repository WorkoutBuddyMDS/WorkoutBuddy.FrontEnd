import React, { ChangeEvent, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  AccountCircleOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import Copyright from '@/components/Copyright/Copyright';
import { useDispatch } from 'react-redux';
import { accountActions } from '@/store/reducers/account';
import axios from 'axios';
import { StyledLink } from '@/styles/styled-components';
import BackButton from '@/components/Buttons/BackButton';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import BasicAlert from '@/components/Alerts/BasicAlert';
import { BasicLoader } from '@/components/Loader/BasicLoader';
import useText from '@/services/site-properties/parsing';

const registerModelInitialState = {
  name: '',
  username: '',
  email: '',
  passwordString: '',
  birthDay: dayjs(Date.now()),
  weight: 0,
};

const Register = () => {
  const router = useRouter();
  const { locale } = router;
  const dispatcher = useDispatch();
  const [registerModel, setRegisterModel] = useState(registerModelInitialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: 'https://localhost:7132/UserAccount/register',
        data: registerModel,
      });
      dispatcher(accountActions.register(res.data));

      await router.push('/');
    } catch ({ response }) {
      setError(
        response.data[0].propertyName + ': ' + response.data[0].errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setError(null);
    setRegisterModel({
      ...registerModel,
      [id]: value,
    });
  };

  const text = {
    registerTitle: useText('pages.register.index.title', locale),
    name: useText('general.name.placeholder.text', locale),
    email: useText('general.email.placeholder.text', locale),
    username: useText('general.username.placeholder.text', locale),
    password: useText('general.password.placeholder.text', locale),
    dateOfBirth: useText('general.date-of-birth.placeholder.text', locale),
    weight: useText('general.weight.placeholder.text', locale),
    createAccount: useText('pages.register.index.button.signup', locale),
    link: useText('pages.register.index.link.text', locale),
  };

  return (
    <>
      <BasicLoader open={loading} />
      <BackButton
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px 10px 10px',
        }}
        onClick={router.back}
      />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              height: '60px',
              width: '60px',
            }}
          >
            <AccountCircleOutlined height="40px" width="40px" />
          </Avatar>
          <Typography component="h1" variant="h3" sx={{ marginBottom: '30px' }}>
            {text.registerTitle}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label={text.name}
                  autoFocus
                  value={registerModel.name}
                  onChange={updateForm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label={text.username}
                  name="username"
                  value={registerModel.username}
                  onChange={updateForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={text.email}
                  name="email"
                  autoComplete="email"
                  value={registerModel.email}
                  onChange={updateForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={text.password}
                  type={showPassword ? 'text' : 'password'}
                  id="passwordString"
                  autoComplete="new-password"
                  value={registerModel.passwordString}
                  onChange={updateForm}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={'start'}>
                        {' '}
                        {showPassword ? (
                          <VisibilityOff
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        ) : (
                          <Visibility
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label={text.dateOfBirth}
                  sx={{ width: '100%' }}
                  value={registerModel.birthDay}
                  onChange={(ev) => {
                    if (ev) {
                      setRegisterModel({
                        ...registerModel,
                        birthDay: ev,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="weight"
                  id="weight"
                  label={text.weight}
                  value={registerModel.weight}
                  onChange={updateForm}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ marginLeft: '10px' }}
                      >
                        kg
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {text.createAccount}
            </Button>
            <Grid container justifyContent="center" sx={{ marginTop: '5px' }}>
              <Grid item>
                <StyledLink href="/login">{text.link}</StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <BasicAlert
        open={!!error}
        alert={{ severity: 'error' }}
        message={error}
        setOpen={() => {}}
      />
    </>
  );
};

export default Register;
