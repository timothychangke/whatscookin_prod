import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import { useState } from 'react';
import './Login.css';

import { Formik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import FlexBox from 'components/UI/FlexBox';

import loginPic from '../../../assets/images/loginPic.png';
import registerPic from '../../../assets/images/registerPic.png'

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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //get palette from useTheme
  const { palette } = useTheme();
  //check if its a mobile screen
  const isNonMobileScreen = useMediaQuery('(min-width: 1200px)');

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
      {isLogin
        ? ({
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
              <div className="container-fluid l-left">
                <div className="row">
                  <div className="col-12 col-xl-4 vh-100 d-flex align-items-center justify-content-center ">
                    <div className="col-11 col-xl-10">
                      <h1 className="mb-5 titleLogin">What's Cookin</h1>
                      <div className="mb-3 ">
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
                          className="form-control py-0 border-2 "
                          id="email"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          label="Password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          error={
                            //if there is an error and the password was touched, then there is an error
                            Boolean(touched.password) &&
                            Boolean(errors.password)
                          }
                          //error will be displayed
                          helperText={touched.password && errors.password}
                          className="form-control py-0 border-2"
                          id="password"
                        />
                      </div>
                      {error !== null && (
                        <p className="bg-danger p-3 text-center ">{error}</p>
                      )}
                      <div className="text-end mt-4 ">
                        <button type="submit" className="btn px-5 py-2 submit">
                          Login
                        </button>
                      </div>

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
                        Don't have an account?
                      </Text>
                    </div>
                  </div>
                  <div className="col-0 col-xl-8 d-flex align-items-center justify-content-center l-right">
                    <div className=" d-flex align-items-center justify-content-center ">
                      <img
                        src={loginPic}
                        className="img-fluid"
                        alt="Login Pic"
                        style={{width: '900px'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        : ({
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
              <div className="container-fluid r-left">
                <div className="row">
                  <div className="col-0 col-xl-4  d-flex align-items-center justify-content-center ">
                    {isNonMobileScreen && <div className=" d-flex align-items-center justify-content-center flex-column">
                      <img style={{width: '600px', objectFit: 'cover', height: '300px', position: 'relative', left: '125px'}}
                        src={registerPic}
                        alt="Register Pic"
                        className="img-fluid gambarRegister"
                      />
                      <img style={{width: '1000px', objectFit: 'cover', height: '300px', position: 'relative', right: '125px'}}
                        src={registerPic}
                        alt="Register Pic"
                        className="img-fluid gambarRegister"
                      />
                      <img style={{width: '1000px', height: '300px', position: 'relative', left: '125px'}}
                        src={registerPic}
                        alt="Register Pic"
                        className="img-fluid gambarRegister"
                      />
                    </div>}
                    
                  </div>
                  <div className="col-12 col-xl-8   d-flex align-items-center justify-content-center vh-100 r-right">
                    <div className="col-11  col-xl-7">
                      <h1 className="mb-5 titleRegister pt-4">Register</h1>
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                          <div className="mb-3">
                            <TextField
                              type="text"
                              className="form-control py-0 border-2"
                              label="First Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              name="firstName"
                              id="firstName"
                              error={
                                //if there is an error and the firstname was touched, then there is an error
                                Boolean(touched.firstName) &&
                                Boolean(errors.firstName)
                              }
                              //error will be displayed
                              helperText={touched.firstName && errors.firstName}
                            />
                          </div>
                        </div>
                        <div className="col-5">
                          <div className="mb-3">
                            <TextField
                              label="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              id="lastName"
                              error={
                                //if there is an error and the lastname was touched, then there is an error
                                Boolean(touched.lastName) &&
                                Boolean(errors.lastName)
                              }
                              //error will be displayed
                              helperText={touched.lastName && errors.lastName}
                              className="form-control py-0 border-2"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <TextField
                          label="Bio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bio}
                          name="bio"
                          id="location"
                          error={
                            //if there is an error and the bio was touched, then there is an error
                            Boolean(touched.bio) && Boolean(errors.bio)
                          }
                          //error will be displayed
                          helperText={touched.bio && errors.bio}
                          className="form-control <py-0></py-0> border-2"
                        />
                      </div>
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
                      <div className="mb-3 mt-3">
                        <TextField
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          id="email"
                          error={
                            //if there is an error and the email was touched, then there is an error
                            Boolean(touched.email) && Boolean(errors.email)
                          }
                          //error will be displayed
                          helperText={touched.email && errors.email}
                          className="form-control py-0 border-2 "
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          label="Password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          id="password"
                          error={
                            //if there is an error and the password was touched, then there is an error
                            Boolean(touched.password) &&
                            Boolean(errors.password)
                          }
                          //error will be displayed
                          helperText={touched.password && errors.password}
                          className="form-control py-0 border-2"
                        />
                      </div>

                      <div className="text-end mt-2">
                        <button type="submit" className="btn px-5 py-2 submit">
                          Submit
                        </button>
                      </div>

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
                        Already have an account?
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
    </Formik>
  );
}

export default LoginPage;
