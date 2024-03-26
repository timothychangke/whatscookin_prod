import { Box } from '@mui/material';

/**
 * This React component renders a circular user profile picture. It utilizes a Box component with a specified width and height, and nests an image element within it. 
 * The image source points to a user profile picture stored locally (likely within an assets folder). The image styles ensure it stretches to fill the container and displays as a circle with a rounded border.
 * @date 27/03/2024 - 01:01:42
 *
 * @export
 * @param {{ image: any; size?: string; }} param0
 * @param {*} param0.image
 * @param {string} [param0.size='60px']
 * @returns {*}
 */
export default function UserImage({ image, size = '60px' }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        src={`http://localhost:3001/assets/${image}`}
        height={size}
        width={size}
        alt="user"
      ></img>
    </Box>
  );
}
