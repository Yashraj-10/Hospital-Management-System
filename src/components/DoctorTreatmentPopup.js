import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormDialogTreatment(props) {
  const treat_id = props.id;
  const [open, setOpen] = React.useState(false);
  console.log("ttttreatment id is", treat_id)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [treatment, setTreatment] = React.useState('');
  const handleAddTreatment  = () =>{
    console.log(treatment);
    setOpen(false);

    axios
    .post('https://dbms-backend-api.azurewebsites.net/add_treatment', {
      access_token: localStorage.getItem("access_token"),
      doc_appointment_id : treat_id,
      treatment : treatment
    }).then(
      (response) => {
        console.log(response.data);
        alert(response.data.message)
        window.location.reload();
    },
    (error) => {
        console.log(error);
    }
    );
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Treatment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a treatment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter treatment name"
            type="email"
            fullWidth
            onChange = {(e) => {
              setTreatment(e.target.value)
            }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTreatment}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}