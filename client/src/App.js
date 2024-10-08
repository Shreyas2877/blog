import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Box, Paper } from "@mui/material";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import backgroundImage from './images/minimal-wallpaper.jpg'; // Import the image

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#657786', // Fallback background color
      paper: '#1d1d1d',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    allVariants: {
      color: '#ffffff',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, // Use the imported image
          backgroundSize: 'cover', // Cover the whole area
          backgroundPosition: 'center', // Center the image
          minHeight: '100vh',
          paddingTop: 2,
          backgroundColor: theme.palette.background.default, // Fallback background color
        }}
      >
        <Container maxWidth="md">
          <Paper sx={{ p: 4, backgroundColor: "#303133" ,opacity: 0.9,
        backdropFilter: 'blur(10px)', transition: 'opacity 0.3s, box-shadow 0.3s', position: 'sticky', top: 0, zIndex: 1 }}>
            <PostCreate />
          </Paper>
          <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)', marginTop: 2 }}>
            <PostList />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
