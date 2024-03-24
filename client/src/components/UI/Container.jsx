import { Box } from '@mui/material';
import { styled } from '@mui/system';

//this gives a base styling for every single widget
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  padding: '1.5rem 1.5rem 0.75rem 0.75rem',
  borderRadius: '0.75rem',
}));

export default Container;