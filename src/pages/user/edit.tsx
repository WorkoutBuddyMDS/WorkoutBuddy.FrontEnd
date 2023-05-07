import React from 'react';
import { TextField, Button } from '@mui/material';
import NavigationLayout from '@/components/Layouts/NavigationLayout';
import { DatePicker } from '@mui/x-date-pickers';

const EditUserPage = () => {
  return (
    <form noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
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
        label="Username"
        name="username"
        autoComplete="username"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone"
        name="phone"
        autoComplete="phone"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="roles"
        label="Roles"
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
        label="Weight"
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
        Save
      </Button>
    </form>
  );
};

EditUserPage.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditUserPage;
