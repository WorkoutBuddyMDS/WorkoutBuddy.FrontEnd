import { useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Divider,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to handle form submission
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Number of Exercises"
          type="number"
          value={numExercises}
          onChange={(e) => setNumExercises(parseInt(e.target.value))}
          disabled
        />
        <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
          Change Password
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
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
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button onClick={handlePasswordChange}>Save</Button>
        </Box>
      </Modal>
    </Box>
  );
};

AdminForm.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminNavigationLayout>{page}</AdminNavigationLayout>;
};

export default AdminForm;
