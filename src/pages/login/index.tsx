import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { StyledBox } from '@/styles/login/styles';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { accountActions } from '@/store/reducers/account';
import { NextPage } from 'next';
import useText from '@/services/site-properties/parsing';
import { Lang } from '@/services/site-properties/data';

interface Validator {
  [key: string]: {
    validator: (el: string) => boolean;
    error: string;
  }[];
}

const INPUT_VALIDATORS: Validator = {
  email: [
    {
      validator: (val: string) => val.length > 10,
      error: 'Your email should be at least 10 characters long',
    },
    {
      validator: (val: string) =>
        new RegExp('^[\\w-.]+@([\\w-]+.)+[\\w-]{2,4}$').test(val),
      error: 'This input is not following an email pattern.',
    },
  ],
  password: [
    {
      validator: (val: string) => val.length >= 12,
      error: 'Your password should be at least 12 characters long',
    },
    {
      validator: (val) => new RegExp('(?=.[0-9])').test(val),
      error: 'Your password should contain at least one number',
    },
    {
      validator: (val) => new RegExp('(?=.[-!@#$%^&])').test(val),
      error:
        'Your password should contain at least one special character(-_!@#$%^&)',
    },
    {
      validator: (val) => new RegExp('(?=.*[A-Z])').test(val),
      error: 'Your password should contain at least one uppercase letter',
    },
  ],
};

const loginModelInitialState = {
  email: '',
  password: '',
  areCredentialsInvalid: false,
  isDisabled: false,
};

interface Props {
  lang: string;
}

const Login: NextPage<Props> = ({ lang }) => {
  const dispatcher = useDispatch();

  const [loginModel, setLoginModel] = useState(loginModelInitialState);

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(loginModel)) {
      for (const el of INPUT_VALIDATORS[key]) {
        if (typeof value === 'string' && !el.validator(value)) {
          setError((prevState) => ({
            ...prevState,
            [key]: el.error,
          }));
          return;
        }
      }
    }

    const res = await axios({
      method: 'post',
      url: 'https://localhost:7132/UserAccount/login',
      data: loginModel,
    });
    dispatcher(accountActions.login(res.data));

    location.href = '/';
  };

  const updateForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setLoginModel({
      ...loginModel,
      [id]: value,
    });
  };

  return (
    <StyledBox component="form" onSubmit={handleFormSubmit}>
      <Typography variant="h5">Log in</Typography>

      <FormControl>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          aria-describedby="email"
          value={loginModel.email}
          onChange={updateForm}
        />
        {error.email && <FormHelperText>{error.email}</FormHelperText>}
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="password"
          value={loginModel.password}
          onChange={updateForm}
        />
        {error.password && <FormHelperText>{error.password}</FormHelperText>}
      </FormControl>

      <Button
        type="submit"
        style={{
          margin: '50px auto 0 auto',
          width: '200px',
          border: '3px solid',
        }}
      >
        Submit
      </Button>
    </StyledBox>
  );
};

Login.getInitialProps = async ({ req, locale }) => {
  const lang = locale || req?.headers['x-language']?.toString();
  return {
    lang: lang || 'ro-RO',
  };
};
export default Login;
