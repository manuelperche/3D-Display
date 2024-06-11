import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6 }}>
      <Typography
        align="center"
        color="text.secondary"
        gutterBottom
        variant="h6"
      >
        Manuel Perche
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        component="p"
        variant="subtitle1"
      >
        Made with ❤️ by Manuel Perche
      </Typography>
    </Box>
  );
}
