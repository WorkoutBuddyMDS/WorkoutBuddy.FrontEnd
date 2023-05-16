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
import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';
import useText from '@/services/site-properties/parsing';

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
  const router = useNavigation();
  const { locale } = useRouter();

  const text = {
    firstName: useText('pages.admin.users.table.first-name', locale),
    lastName: useText('pages.admin.users.table.last-name', locale),
    email: useText('pages.admin.users.table.email', locale),
    roles: useText('pages.admin.users.table.roles', locale),
    actions: useText('pages.admin.users.table.actions', locale),
    makeAdmin: useText('pages.admin.users.tooltip.make-admin', locale),
    deleteUser: useText('pages.admin.users.table.delete-user', locale),
    deleteUserModal: useText('pages.admin.users.modal.title', locale),
    deleteModalContent: useText('pages.admin.users.modal.content', locale),
    cancel: useText('general.modal.text.cancel', locale),
    delete: useText('general.delete.text'),
  };
  useEffect(() => {
    setLoading(true);
    const roles = sessionStorage.getItem('roles');
    if (!roles?.includes('admin')) {
      router.push('/');
      setLoading(false);
    }
  }, []);

  const handleMakeAdminClick = (userId: string) => {
    console.log(`Make admin clicked for user with ID ${userId}`);
  };

  const handleDeleteClick = (userId: string) => {
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
              <TableCell>{text.firstName}</TableCell>
              <TableCell>{text.lastName}</TableCell>
              <TableCell>{text.email}</TableCell>
              <TableCell>{text.roles}</TableCell>
              <TableCell>{text.actions}</TableCell>
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
                  <Tooltip title={text.makeAdmin}>
                    <IconButton
                      aria-label="make admin"
                      onClick={() => handleMakeAdminClick(user.id)}
                    >
                      <SupervisorAccountIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={text.deleteUser}>
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
        <DialogTitle>{text.deleteUserModal}</DialogTitle>
        <DialogContent>{text.deleteModalContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>{text.cancel}</Button>
          <Button onClick={handleDeleteDialogConfirm} color="error">
            {text.delete}
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
