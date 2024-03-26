import { Box } from '@mui/material';
import { styled } from '@mui/system';

//css component that can be reused throughout the application
const FlexBox = styled(Box)({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
});

export default FlexBox
