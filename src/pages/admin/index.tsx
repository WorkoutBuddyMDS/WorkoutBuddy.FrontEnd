import React, { useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Divider,
  Container,
  Grid,
} from '@mui/material';
import AdminNavigationLayout from '@/components/Layouts/AdminNavigationLayout';

const AdminForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numExercises, setNumExercises] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordChange = () => {
    // code to handle password change
    setIsModalOpen(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // code to handle form submission
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Your profile
        </Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Exercises"
                  type="number"
                  value={numExercises}
                  onChange={(e) => setNumExercises(parseInt(e.target.value))}
                  disabled
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 2, display: 'flex' }}>
              <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
                Change Password
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5">Change Password</Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Box sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ marginTop: 2, display: 'flex' }}>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              onClick={handlePasswordChange}
              disabled={!newPassword || newPassword !== confirmPassword}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

AdminForm.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminNavigationLayout>{page}</AdminNavigationLayout>;
};

export default AdminForm;
