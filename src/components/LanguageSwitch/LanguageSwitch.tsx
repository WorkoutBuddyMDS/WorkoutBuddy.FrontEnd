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
import RoFlagIcon from '../..//components/Icons/ROFlagIcon';
import UkFlagIcon from '../../components/Icons/UKFlagIcon';
import useText from '../../services/site-properties/parsing';

export default function LanguageSwitch() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(
    router.locale === 'ro-RO' ? 'ro' : 'uk'
  );

  const text = {
    romanian: useText('language.romanian.text', router.locale),
    english: useText('language.english.text', router.locale),
    titleModal: useText('language.switch.title.text', router.locale),
    cancelText: useText('general.modal.text.cancel', router.locale),
    save: useText('general.save.text', router.locale),
  };

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSave = () => {
    location.replace(
      language === 'uk'
        ? 'http://www.workoutbuddy.com:3000'
        : 'http://www.workoutbuddy.ro:3000'
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
        <DialogTitle id="language-dialog-title">{text.titleModal}</DialogTitle>
        <DialogContent>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleChange}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="uk">{text.english}</MenuItem>
            <MenuItem value="ro">{text.romanian}</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{text.cancelText}</Button>
          <Button onClick={handleSave}>{text.save}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
