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

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <Card
      key={post.id}
      sx={{
        width: '45%',
        mb: 2,
        backgroundColor: theme.palette.background.paper,
        mx: 'auto',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <CommentCreate postId={post.id} />
        <CommentList postId={post.id} />
      </CardContent>
    </Card>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {renderedPosts}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostList;
