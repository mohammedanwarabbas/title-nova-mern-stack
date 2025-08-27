import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Container
} from "@mui/material";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMui,
  SiVite,
  SiSass,
  SiAxios,
  SiFramer,
  SiJavascript,
  SiCss3
} from "react-icons/si";
import { FaServer } from "react-icons/fa";

const About: React.FC = () => {
  const technologies = [
    { name: "React", icon: <SiReact size={40} color="#61DAFB" />, color: "#61DAFB" },
    { name: "TypeScript", icon: <SiTypescript size={40} color="#3178C6" />, color: "#3178C6" },
    { name: "Redux Toolkit", icon: <SiRedux size={40} color="#764ABC" />, color: "#764ABC" },
    { name: "Node.js", icon: <SiNodedotjs size={40} color="#339933" />, color: "#339933" },
    { name: "Express.js", icon: <SiExpress size={40} color="#000000" />, color: "#000000" },
    { name: "Material-UI", icon: <SiMui size={40} color="#007FFF" />, color: "#007FFF" },
    { name: "Vite", icon: <SiVite size={40} color="#646CFF" />, color: "#646CFF" },
    { name: "SASS/SCSS", icon: <SiSass size={40} color="#CC6699" />, color: "#CC6699" },
    { name: "Axios", icon: <SiAxios size={40} color="#5A29E4" />, color: "#5A29E4" },
    { name: "Framer Motion", icon: <SiFramer size={40} color="#0055FF" />, color: "#0055FF" },
    { name: "JavaScript", icon: <SiJavascript size={40} color="#F7DF1E" />, color: "#F7DF1E" },
    { name: "CSS3", icon: <SiCss3 size={40} color="#1572B6" />, color: "#1572B6" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #1a1c24 0%, #232734 50%, #2c2f3a 100%)",
      py: 8,
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: "bold", 
              color: "primary.main",
              mb: 2,
              background: "linear-gradient(45deg, #ffd166 30%, #ef476f 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            About Title Nova
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: "text.secondary", 
              mb: 6,
              maxWidth: 800,
              mx: "auto"
            }}
          >
            An <b>AI-powered</b> Title generator that transforms your content into captivating titles. 
            Built with cutting-edge technologies for a seamless user experience.
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 6,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 1
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: "primary.main",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              <FaServer style={{ fontSize: '4rem' }}/> Built With Modern Tech Stack
            </Typography>
            
            <Grid container spacing={3} justifyContent={'center'}>
  {technologies.map((tech) => (
    <Grid item xs={6} sm={4} md={3} key={tech.name} sx={{ display: 'flex' }}>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ width: '100%' }}
      >
        <Paper
          sx={{
            p: 3,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            transition: "all 0.3s ease",
            minHeight: 140, // Fixed height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // Full width of grid item
            "&:hover": {
              borderColor: tech.color,
              boxShadow: `0 0 20px ${tech.color}40`
            }
          }}
        >
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            {tech.icon}
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: "medium",
              color: "text.primary",
              flexShrink: 0
            }}
          >
            {tech.name}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  ))}
</Grid>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 1
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: "primary.main",
                mb: 3
              }}
            >
              🚀 Frontend Power
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
              <strong>React + TypeScript</strong> with <strong>Vite</strong> for blazing fast development<br/>
              <strong>Redux Toolkit</strong> for state management<br/>
              <strong>Material-UI</strong> with custom theme and <strong>SASS</strong> for styling<br/>
              <strong>Framer Motion</strong> for smooth animations<br/>
              <strong>Axios</strong> for API communication
            </Typography>

            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: "primary.main",
                mt: 4,
                mb: 3
              }}
            >
              ⚡ Backend Strength
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
              <strong>Node.js + Express.js</strong> server<br/>
              <strong>NLP Cloud API</strong> integration for AI headline generation<br/>
              Multiple API key rotation system<br/>
              CORS enabled for cross-origin requests
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: "primary.light",
              fontStyle: "italic"
            }}
          >
            Developed with ❤️ by Anwar
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "text.secondary",
              mt: 1
            }}
          >
            Crafting digital experiences that matter
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;