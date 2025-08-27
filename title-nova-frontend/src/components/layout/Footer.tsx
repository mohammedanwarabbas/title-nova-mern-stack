import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        backgroundColor: "#f2f2f2",
      }}
    >
      <Typography variant="body2" color="black">
        &copy; {new Date().getFullYear()} TitleNova. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">Made by Anwar</Typography>
    </Box>
  );
};

export default Footer;
