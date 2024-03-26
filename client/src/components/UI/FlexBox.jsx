import { Box } from '@mui/material';
import { styled } from '@mui/system';

//css component that can be reused throughout the application
/**
 * This code creates a styled component named FlexBox using styled-components. It builds upon the Box component and arranges its child elements in a flexbox layout. 
 * The children are spaced evenly with maximum separation and vertically centered within the container.
 * 
 * @date 27/03/2024 - 01:00:44
 *
 * @type {*}
 */
const FlexBox = styled(Box)({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
});

export default FlexBox
