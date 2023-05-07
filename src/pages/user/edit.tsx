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

const EditUserPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSavePassword = () => {
    // TODO: Implement password update logic here
    handleCloseModal();
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
        <Button
          type="button"
          onClick={handleOpenModal}
          variant="outlined"
          color="secondary"
        >
          Change password
        </Button>
      </form>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSavePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditUserPage.getLayout = function (page: React.ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditUserPage;
