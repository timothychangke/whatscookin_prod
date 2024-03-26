import { Box } from '@mui/material';
import { styled } from '@mui/system';

//this gives a base styling for every single widget
/**
 * This function creates a reusable React component named `SearchInput` using Material-ui's `TextField` component. It leverages the `useRef` hook to store a reference to the input element. 
 * The component renders a text field for user input, potentially with additional styling or configuration based on the provided props. 
 * 
 * @date 27/03/2024 - 00:58:28
 *
 * @type {*}
 */
const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  padding: '1.5rem 1.5rem 0.75rem 0.75rem',
  borderRadius: '0.75rem',
}));

export default Container;