import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from '@mui/icons-material';
import AdminNavigationLayout from '@/components/Layouts/AdminNavigationLayout';
import { useRouter } from 'next/navigation';

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    roles: ['user'],
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    roles: ['user', 'admin'],
  },
];

const UsersPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const roles = sessionStorage.getItem('roles');
    if (!roles?.includes('admin')) {
      router.push('/');
      setLoading(false);
    }
  }, []);

  const handleMakeAdminClick = (userId) => {
    console.log(`Make admin clicked for user with ID ${userId}`);
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteDialogConfirm = () => {
    console.log(`Delete clicked for user with ID ${selectedUserId}`);
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(', ')}</TableCell>
                <TableCell>
                  <Tooltip title="Make Admin">
                    <IconButton
                      aria-label="make admin"
                      onClick={() => handleMakeAdminClick(user.id)}
                    >
                      <SupervisorAccountIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton
                      aria-label="delete user"
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteDialogConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminNavigationLayout>{page}</AdminNavigationLayout>;
};
export default UsersPage;
