import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: 'rgba(29, 29, 29, 0.7)', // Semi-transparent paper for smoky glass effect
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

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <Card
      key={post.id}
      sx={{
        mb: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(144, 202, 249, 0.5)', // Subtle glow effect
        opacity: 0.9,
        backdropFilter: 'blur(10px)', // Apply the blur for smoky glass effect
        transition: 'opacity 0.3s, box-shadow 0.3s',
        '&:hover': {
          opacity: 1,
          boxShadow: '0 8px 16px rgba(144, 202, 249, 0.7)', // More pronounced glow on hover
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <CommentCreate postId={post.id} />
        <CommentList comments={post.comments} />
      </CardContent>
    </Card>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
          {renderedPosts}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostList;
