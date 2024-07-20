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
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.5)', // Subtle watermark color
          mb: 1
        }}
      >
        Shreyas
      </Typography>
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: theme.palette.background.paper, 
          borderRadius: '15px',
          overflow: 'hidden',
          wordWrap: 'break-word',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adding a shadow for bubble effect
          maxWidth: '60%',
        }}
      >
        <Typography variant="body2">
          {comment.content}
        </Typography>
      </Box>
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
        border: `1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 2 // Gap between comment bubbles
      }}>
        {renderedComments}
      </Box>
    </ThemeProvider>
  );
};

export default CommentList;
