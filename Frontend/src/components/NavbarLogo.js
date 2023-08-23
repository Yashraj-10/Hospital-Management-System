import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Logo from '../images/logo.jpg';
export default function NavbarLogo() {
  return (
    <Stack direction="row" spacing={5}>
      
      <Avatar
        alt="azad"
        src={Logo}
        sx={{ width: 50, height: 50 }}
      />
    </Stack>
  );
}