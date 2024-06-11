import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function Header() {

  return (
    <Box>
        <Typography
          align="center"
          color="text.secondary"
          component="h2"
          noWrap
          sx={{ flex: 1 }}
          variant="h2"
        >
          3D Display
        </Typography>
      </Box>
  );
}