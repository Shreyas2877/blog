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

    if (content.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    await axios.post(`http://posts.com/posts/${postId}/comments`, { content });
    setContent('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Comment"
          variant="outlined"
          placeholder="Enter comment"
          InputLabelProps={{
            style: { color: 'rgba(255, 255, 255, 0.5)' }, // Subtle watermark style
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={content.trim() === ""}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
      <br/>
      <Typography variant="p" component="label" gutterBottom>
        Comments
      </Typography>
    </ThemeProvider>
  );
};

export default CommentCreate;
