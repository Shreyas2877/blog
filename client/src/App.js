import PostCreate from "./PostCreate";
import PostList from "./PostList";
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: theme.palette.background.default,
            py: 2,
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            width: '100%',
          }}
        >
          <PostCreate />
        </Box>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PostList />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
