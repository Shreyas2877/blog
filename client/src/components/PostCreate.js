import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
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

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    await axios.post("http://localhost:4000/posts", { title });
    setTitle("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', px: 2 }}>
        <Paper sx={{ 
          p: 4, 
          backgroundColor: theme.palette.background.paper, 
          boxShadow: '0 4px 8px rgba(240, 236, 165, 0.5)', 
          borderRadius: 2, // Adding rounded corners
          '&:hover': {
            opacity: 1,
            boxShadow: '0 8px 16px rgba(240, 236, 165, 0.7)', // More pronounced glow on hover
          }, 
        }}>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Post it!
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              placeholder="Enter title"
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.5)' }, // Subtle watermark style
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={title.trim() === ""}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default PostCreate;
