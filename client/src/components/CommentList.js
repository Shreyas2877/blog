import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

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

const CommentList = ({ comments }) => {
  
  const renderedComments = comments.length > 0 ? comments.map((comment) => (
    <Box 
      key={comment.id} 
      sx={{ 
        mb: 1, 
        p: 1, 
        backgroundColor: theme.palette.background.paper, 
        borderRadius: 1,
        overflow: 'hidden',
        wordWrap: 'break-word'
      }}
    >
      <Typography variant="body2">
        {comment.content}
      </Typography>
    </Box>
  )) : (
    <Typography 
      variant="body2" 
      sx={{ 
        color: theme.palette.text.disabled, 
        textAlign: 'center', 
        mt: 2 
      }}
    >
      No comments yet
    </Typography>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        maxHeight: '150px', 
        overflowY: 'auto', 
        mt: 2,
        p: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        border: `1px solid ${theme.palette.primary.main}`
      }}>
        {renderedComments}
      </Box>
    </ThemeProvider>
  );
};

export default CommentList;
