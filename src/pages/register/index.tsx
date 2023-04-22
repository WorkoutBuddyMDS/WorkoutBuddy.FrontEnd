import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Link from 'next/link';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import Copyright from '@/components/Copyright/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../../store/reducers/account';
import axios from 'axios';

const registerModelInitialState = {
  name: '',
  username: '',
  email: '',
  passwordString: '',
  birthDay: '',
  weight: 0,
};

const Register = () => {
  const dispatcher = useDispatch();
  const [registerModel, setRegisterModel] = useState(registerModelInitialState);
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(registerModel);
    const res = await axios({
      method: 'post',
      url: 'https://localhost:7132/UserAccount/register',
      data: registerModel,
    });

    dispatcher(accountActions.register(res.data));

    location.href = '/';
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="birth"
                label="Date of birth"
                type="date"
                id="date"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="weight"
                label="Weight"
                type="number"
                id="weight"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default Register;
