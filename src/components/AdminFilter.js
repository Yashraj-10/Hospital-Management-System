import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    DBA: false,
    FD: false,
    DE: false,
    doctor: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { DBA, FD, DE, doctor } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: -2 }} component="fieldset" variant="standard">
        <FormLabel component="legend"></FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={DBA} onChange={handleChange} name="DBA" />
            }
            label="DBA"
          />
          <FormControlLabel
            control={
              <Checkbox checked={FD} onChange={handleChange} name="FD" />
            }
            label="FD"
          />
          <FormControlLabel
            control={
              <Checkbox checked={DE} onChange={handleChange} name="DE" />
            }
            label="DE"
          />
          <FormControlLabel
            control={
              <Checkbox checked={doctor} onChange={handleChange} name="doctor" />
            }
            label="Doctor"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}