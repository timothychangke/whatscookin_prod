import { Box } from '@mui/material';

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
