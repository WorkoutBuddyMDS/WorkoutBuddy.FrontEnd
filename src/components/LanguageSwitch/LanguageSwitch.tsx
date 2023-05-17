import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import RoFlagIcon from '@/components/Icons/ROFlagIcon';
import UkFlagIcon from '@/components/Icons/UKFlagIcon';

export default function LanguageSwitch() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(
    router.locale === 'ro-RO' ? 'ro' : 'uk'
  );

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSave = () => {
    router.push(
      `http://www.workoutbuddy.${language === 'uk' ? 'com' : 'ro'}:3000`
    );
    setOpen(false);
  };

  return (
    <>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.9)',
          },
          '&:focus': {
            backgroundColor: 'rgba(255,255,255,0.7)',
          },
        }}
        onClick={() => setOpen(true)}
      >
        {router.locale === 'ro-RO' ? <RoFlagIcon /> : <UkFlagIcon />}
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="language-dialog-title"
        aria-describedby="language-dialog-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiPaper-root': {
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <DialogTitle id="language-dialog-title">Select Language</DialogTitle>
        <DialogContent>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleChange}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="uk">English</MenuItem>
            <MenuItem value="ro">Romana</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
