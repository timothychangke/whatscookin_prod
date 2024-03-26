import React, { useEffect, useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');

  const submitDataRegister = async (e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append('firstName', firstName);
    registerData.append('lastName', lastName);
    registerData.append('email', email);
    registerData.append('password', password);
    registerData.append('picturePath', picturePath);
    registerData.append('occupation', occupation);
    registerData.append('location', location);

    try {
      const registerApi = await fetch(`${import.meta.env.VITE_URL_REGISTER}`, {
        method: 'POST',
        body: registerData,
      });

      if (registerApi.ok) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPicturePath('');
        setOccupation('');
        setLocation('');
        navigate('/');
      } else {
        const errorResponse = await registerApi.json();
        console.error('Registration failed:', errorResponse);
      }
    } catch (error) {
      console.log(`Gagal menambahkan data register`);
    }
  };
  return (
    <>
      <div className="container-fluid r-left">
        <div className="row">
          <div className="col-0 col-xl-4  d-flex align-items-center justify-content-center ">
            <div className=" d-flex align-items-center justify-content-center ">
              <img src="./assets/reg.png" alt="login Image" className="img-fluid gambarRegister" />
            </div>
          </div>
          <div className="col-12 col-xl-8   d-flex align-items-center justify-content-center vh-100 r-right">
            <div className="col-11  col-xl-7">
              <h1 className="mb-5 titleRegister pt-4">Register</h1>

              <form onSubmit={submitDataRegister}>
                <div className="d-flex justify-content-between">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label  emailpassword">
                        FistName <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control py-1 border-2"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label  emailpassword">
                        LastName <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text "
                        className="form-control py-1 border-2"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label emailpassword">
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input type="email" className="form-control py-1 border-2 " id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label  emailpassword">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control py-1 border-2"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="picture" className="form-label emailpassword cursor-pointer ">
                    Picture
                  </label>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png,image/jpg"
                    className="form-control py-1 border-2"
                    id="picture1"
                    onChange={(e) => setPicturePath(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="occupation" className="form-label  emailpassword">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="form-control py-1 border-2"
                    id="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label  emailpassword">
                    Location
                  </label>
                  <input type="text" className="form-control py-1 border-2" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="text-end mt-2">
                  <button type="submit" className="btn px-5 py-1 submit">
                    Submit
                  </button>
                </div>
              </form>
              <p className="text-center mt-1 toLogin">
                Alreadt have account ?
                <Link to={'/'} className=" linktoLogin">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;