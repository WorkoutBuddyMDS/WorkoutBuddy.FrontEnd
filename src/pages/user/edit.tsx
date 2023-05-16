import React, { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import { DatePicker } from '@mui/x-date-pickers';
import useText from '@/services/site-properties/parsing';
import { useRouter } from 'next/router';

const EditUserPage = () => {
  const { locale } = useRouter();

  const text = {
    name: useText('general.name.placeholder.text', locale),
    username: useText('general.username.placeholder.text', locale),
    email: useText('general.email.placeholder.text', locale),
    password: useText('general.password.placeholder.text', locale),
    dateOfBirth: useText('general.date-of-birth.placeholder.text', locale),
    weight: useText('general.weight.placeholder.text', locale),
    phone: useText('general.phone.placeholder.text', locale),
    roles: useText('pages.admin.users.table.roles', locale),
    save: useText('general.save.text', locale),
  };
  return (
    <>
      <form noValidate>
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
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label={text.phone}
          name="phone"
          autoComplete="phone"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="roles"
          label={text.roles}
          name="roles"
          autoComplete="roles"
          disabled
        />
        <DatePicker sx={{ width: '100%' }} label="Birthday" />
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
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="summary"
          label="Summary"
          name="summary"
          autoComplete="summary"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          {text.save}
        </Button>
      </form>
    </>
  );
};

EditUserPage.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditUserPage;
