import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form.jsx';
// import Form from './WIP2/LoginPage'
import LogoLMWithName from '../../assets/images/logos/Logo_LightMode_WithName.png'

const LoginPage = () => {
  //set theme for login page
  const theme = useTheme();
  //check is screen width is mobile screen
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.2rem 6%"
        textAlign="center"
      >
        <img src={LogoLMWithName} height='85' width='160' style={{objectFit: 'cover'}}/>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="24px" color="primary" paddingBottom={'8px'}>
        Get Cookin' with What's Cookin! 
        </Typography> 
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
