import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';

export default function FormDialogReset() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [newpassword, setNewPassword] = useState('');
  const handleReset = () => {
    // alert('Reset Password');
    console.log(newpassword);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Reset Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            value = {newpassword}
            onChange = {(e) => setNewPassword(e.target.value)}
            label="Enter New Password"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReset}>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}