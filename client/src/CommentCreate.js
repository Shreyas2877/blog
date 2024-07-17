import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, createTheme, ThemeProvider } from '@mui/material';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

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

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
    setContent('');
  };

  return (
    <ThemeProvider theme={theme}>
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" component="label" gutterBottom>
        New Comment
      </Typography>
      <TextField
              label="comment"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
            />
      <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
    </Box>
    </ThemeProvider>
  );
};

export default CommentCreate;
