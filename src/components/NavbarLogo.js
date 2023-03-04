import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function NavbarLogo() {
  return (
    <Stack direction="row" spacing={2}>
      
      <Avatar
        alt="azad"
        src="/"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  );
}