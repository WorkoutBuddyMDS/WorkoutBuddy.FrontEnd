import React, { ChangeEvent, useState } from 'react';
import {
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
  const dispatcher = useDispatch();
  const [registerModel, setRegisterModel] = useState(registerModelInitialState);
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios({
      method: 'post',
      url: 'https://localhost:7132/UserAccount/register',
      data: registerModel,
    });

    dispatcher(accountActions.register(res.data));

    await router.push('/');
  };

  const updateForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setRegisterModel({
      ...registerModel,
      [id]: value,
    });
  };

  return (
    <>
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
            Sign up
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
                  label="Name"
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
                  label="Username"
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
                  label="Email Address"
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
                  label="Password"
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
                  label="Date of birth"
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
                  label="Weight"
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
              Sign Up
            </Button>
            <Grid container justifyContent="center" sx={{ marginTop: '5px' }}>
              <Grid item>
                <StyledLink href="/login">
                  Already have an account? Sign in
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default Register;
