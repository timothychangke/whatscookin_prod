import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBox from 'components/UI/FlexBox';
import './Login.css';

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
const initialValuesRegister = {
  firstName: '',
  lastName: '',
  bio: '',
  picture: '',
  email: '',
  password: '',
};

//set the initial values of the Login form (empty values)
const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  //set page type to login or register
  const [pageType, setPageType] = useState('login');
  //get palette from useTheme
  const { palette } = useTheme();
  //dispatch actions from the redux store
  const dispatch = useDispatch();
  //to navigate to different pages
  const navigate = useNavigate();
  //check if its a mobile screen
  const isNonMobileScreen = useMediaQuery('(min-width: 600px)');
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
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
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
          <div className="container-fluid l-left">
            <div className="row">
              <div className="col-12 col-xl-4 vh-100 d-flex align-items-center justify-content-center ">
                <div className="col-11 col-xl-10">
                  <h1 className="mb-5 titleLogin">DevUnity</h1>
                  <div className="mb-3 ">
                    <label
                      htmlFor="email"
                      className="form-label emailpasswords"
                    >
                      Email address
                    </label>
                    <input
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
                    />
                    <div id="emailHelp" className="form-text emailpasswords">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label  emailpasswords"
                    >
                      Password
                    </label>
                    <input
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
                    />
                  </div>
                  <div className="text-end mt-4">
                    <button type="submit" className="btn px-5 py-2 submit">
                      Login
                    </button>
                  </div>
                  <p className="text-center mt-3 toRegister">
                    No account yet?{' '}
                  </p>
                </div>
              </div>
              <div className="col-0 col-xl-8 d-flex align-items-center justify-content-center l-right">
                <div className=" d-flex align-items-center justify-content-center ">
                  <img
                    src="assets/login.png"
                    className="img-fluid"
                    alt="GambarLogin"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
