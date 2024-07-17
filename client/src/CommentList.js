import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';

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

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => (
    <Box 
      key={comment.id} 
      sx={{ 
        mb: 2, 
        p: 2, 
        backgroundColor: theme.palette.background.paper, 
        borderRadius: 1,
        overflow: 'hidden',
        wordWrap: 'break-word'
      }}
    >
      <Typography variant="body1">
        {comment.content}
      </Typography>
    </Box>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {renderedComments}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CommentList;
