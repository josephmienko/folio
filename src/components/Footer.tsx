import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ textAlign: 'center', py: 2 }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} Folio. All Rights Reserved.
    </Typography>
  </Box>
);

export default Footer;
