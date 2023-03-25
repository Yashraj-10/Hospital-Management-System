import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordAdmin(props) {
  const [open, setOpen] = React.useState(false);
  var user_id = props.user_id;
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

    axios.post('https://dbms-backend-api.azurewebsites.net/users/update_pass', {
              access_token: localStorage.getItem("access_token"),
              user_id: user_id,
              password: newpassword
          })
              .then(
                  (response) => {
                      // setPost(response.data);
                      console.log(response.data);
                      alert(response.data.message);
                      window.location.reload();
                  },
                  (error) => {
                      // console.log(error);
                      alert(error.response.data.message);
                  }
              );
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