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
    window.location.reload(); // Reloads the page to fetch the new posts
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', px: 2 }}>
        <Paper sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
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
