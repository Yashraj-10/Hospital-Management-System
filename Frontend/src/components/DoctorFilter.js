import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    Above: false,
    Between1: false,
    Between2: false,
    Below: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    // console.log(state);
  };

  var { Above, Between1, Between2, Below } = state;
  
  React.useEffect (() => {
    state.Above = Above;
    state.Between1 = Between1;
    state.Between2 = Between2;
    state.Below = Below;
  },[state])

  console.log("state=",state);

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: -2 }} component="fieldset" variant="standard">
        <FormLabel component="legend"></FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Above} onChange={handleChange} name="Above" />
            }
            label="Above 60 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Between1} onChange={handleChange} name="Between1" />
            }
            label="Between 40 to 60 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Between2} onChange={handleChange} name="Between2" />
            }
            label="Between 20 to 40 yrs"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Below} onChange={handleChange} name="Below" />
            }
            label="Below 20 yrs"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}