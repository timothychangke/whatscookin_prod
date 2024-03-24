import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { useState } from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import FlexBox from 'components/UI/FlexBox';

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography as Text,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const registerSchema = yup.object().shape({
  //First name is a string of characters that cannot contain numbers, special characters and whitespaces
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'First name can only contain letters')
    .required('First name is required'),
  //Last name is a string of characters that cannot contain numbers, special characters and whitespaces
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Last name can only contain letters')
    .required('Last name is required'),
  //Email must contain a '@' symbol and is in proper domain format
  email: yup.string().email('invalid email').required('Email is required'),
  //Password is longer than 8 characters, contains one or more upper and lower case letters, and one or more numbers
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'Password must contain at least one number')
    .required('Password is required'),
  //Bio must not exceeded the maximum word count
  bio: yup
    .string()
    .max(150, 'Your Bio has hit the maximum word count')
    .required('Bio is required'),
  picture: yup.string().required('Picture is required'),
});

const loginSchema = yup.object().shape({
  //Email must contain a '@' symbol and is in proper domain format
  email: yup.string().email('invalid email').required('Email is required'),
  //Password is longer than 8 characters, contains one or more upper and lower case letters, and one or more numbers
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]+/, 'Password must contain at least one number')
    .required('Password is required'),
});

//set the initial values of the register form (empty values)
const registerStartState = {
  firstName: '',
  lastName: '',
  bio: '',
  picture: '',
  email: '',
  password: '',
};

//set the initial values of the Login form (empty values)
const LoginStartState = {
  email: '',
  password: '',
};

const Form = () => {
  //get palette from useTheme
  const { palette } = useTheme();
  //check if its a mobile screen
  const isNonMobileScreen = useMediaQuery('(min-width: 600px)');
  
  //dispatch actions from the redux store
  const dispatch = useDispatch();
  //to navigate to different pages
  const navigate = useNavigate();

  //set page type to login or register
  const [pageType, setPageType] = useState('login');
  
  //easier to display managed state
  const isLogin = pageType === 'login';
  //easier to display managed state
  const isRegister = pageType === 'register';

  //register function that calls the backend
  const register = async (values, onSubmitProps) => {
    //this allows form information with image to be sent to the backend
    const formData = new FormData();
    //loop through all the keys and append it to formData. This is how we are going to send to the image to the request body
    for (let value in values) {
      //adds it as a new key-value pair
      formData.append(value, values[value]);
    }
    //name of the file is the path. This has to be appended manually.
    formData.append('picturePath', values.picture.name);
    //save whatever is thrown back from the backend
    const savedUserResponse = await fetch(
      //fetch from the backend
      'http://localhost:3001/auth/register',
      //post the form data to this^ api call
      {
        method: 'POST',
        body: formData,
      },
    );
    //invoke saveUserResponse and parse the object
    const savedUser = await savedUserResponse.json();
    //reset the form after request is done
    onSubmitProps.resetForm();
    //if user is successfully obtained
    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    //save whatever is thrown back from the backend
    const loggedInResponse = await fetch(
      //fetch from the backend
      'http://localhost:3001/auth/login',
      //post the form data to this^ api call
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      },
    );
    const loggedIn = await loggedInResponse.json();
    //reset the form after request is done
    onSubmitProps.resetForm();
    //if user is successfully logged in
    if (loggedIn) {
      //dispatch redux state action
      dispatch(
        //pass in payload
        setLogin({
          user: loggedIn.userStoredInDB,
          token: loggedIn.authToken,
        }),
      );
      //authentication is successful and you can navigate home
      navigate('/home');
    }
  };

  //async function to handle form submit
  const handleFormSubmit = async (values, onSubmitProps) => {
    // if isLogin, await login function
    if (isLogin) await login(values, onSubmitProps);
    //if isRegister, await register function
    if (isRegister) await register(values, onSubmitProps);
    //Formik is taking in handleFormSubmit so that it can be passed into handleSubmit
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? LoginStartState : registerStartState}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: isNonMobileScreen ? undefined : 'span 4',
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    //if there is an error and the firstname was touched, then there is an error
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  //error will be displayed
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={
                    //if there is an error and the lastname was touched, then there is an error
                    Boolean(touched.lastName) && Boolean(errors.lastName)
                  }
                  //error will be displayed
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={
                    //if there is an error and the bio was touched, then there is an error
                    Boolean(touched.bio) && Boolean(errors.bio)
                  }
                  //error will be displayed
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    mulitple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBox>
                            <Text>{values.picture.name}</Text>
                            <EditOutlinedIcon />
                          </FlexBox>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={
                //if there is an error and the email was touched, then there is an error
                Boolean(touched.email) && Boolean(errors.email)
              }
              //error will be displayed
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={
                //if there is an error and the password was touched, then there is an error
                Boolean(touched.password) && Boolean(errors.password)
              }
              //error will be displayed
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Text
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login');
                //clean up form when switching from login to register and vice versa
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Text>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
