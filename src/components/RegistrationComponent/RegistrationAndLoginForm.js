import React, { useState } from "react";
import { useHistory,NavLink } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axiosConfig from "../../Config/axiosConfig";
import Cookies from "universal-cookie";
import "react-datepicker/dist/react-datepicker.css";
const RegistrationAndLoginForm = ({ isAuth, isStudentAuth }) => {
  const newcookies = new Cookies();
  let history = useHistory();
  isAuth = false;
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [docForm, setDocForm] = useState([]);
  const [profilePicture, setFile] = useState("");
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    city: "",
    degreeTitle: "",
    universityName: "",
    phoneNumber: "",
  });
  const [message, setMessages] = useState({
    registerSuccess: "",
    registerError: "",
    loginError: "",
  });
  const [dateOfBirth, setStartDate] = useState();
  const registerObj = {
    ...register,
    dateOfBirth,
    profilePicture,
  };
  function documentEvent(event) {
    event.preventDefault();
    let file_reader = new FileReader();
    let file = event.target.files[0];
    file_reader.onload = () => {
      setDocForm([...docForm, { uploaded_file: file_reader.result }]);
      setFile(file_reader.result);
    };
    file_reader.readAsDataURL(file);
  }
  ////  console.log(registerObj)
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setMessages({
      registerSuccess: "",
      registerError: "",
    });
    axiosConfig
      .post("/students/signup", registerObj)
      .then(function (response) {
        if (response.status === 200) {
          isStudentAuth = true;
          localStorage.setItem("studentSignup", isStudentAuth);
          // console.log(response.data)
          history.push({
            pathname: `/student-email/${response.data.data._id}`,
            state: response.data.data._id,
          });
          setIsRegisterLoading(false);
          setMessages({
            registerSuccess: response.data.message,
            registerError: "",
          });
        }
      })

      .catch((error) => {
        setMessages({
          registerSuccess: "",
          registerError: error.response.data.message,
        });
        setIsRegisterLoading(false);
      });
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    isAuth = true;
    axiosConfig
      .post("/students/login", login)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.data.student.isApproved) {
            isAuth = true;
            setMessages({
              loginError: "",
              registerSuccess: "",
              registerError: "",
            });
            // console.log(response.data.data)
            localStorage.setItem("studentAuth", isAuth);
            localStorage.setItem("newStudent",JSON.stringify(response.data.data))
            // newcookies.set("newstudent", response.data.data, {
            //   path: "/",
            // });
            
            history.push("/newsfeed");
            setIsLoading(false);
          } else {
            isAuth = true;
            localStorage.setItem("studentSignup", isAuth);
            setIsLoading(false);
            history.push({
              pathname: `/student-email/${response.data.data.student._id}`,
              state: response.data.data.student._id,
            });
          }
        }
      })

      .catch((error) => {
        setIsLoading(false);
        console.log(error)
        setMessages({
          loginError:error,
          registerSuccess: "",
          registerError: "",
        });
      });
  };
  const loginInputEvent = (e) => {
    const { name, value } = e.target;
    setLogin((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const inputEvent = (e) => {
    const { name, value } = e.target;

    setRegister((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

 
  return (
    <>
      <div id="lp-register">
        <div className="container wrapper">
          <div className="row">
            <div className="col-sm-5">
              <div className="intro-texts">
                <h1 className="text-white">Welcome Students !!!</h1>
                <p>
                  The educational network is a social network which is a median
                  to connect students between different universities .<br />{" "}
                  <br />
                  Why are you waiting for? Donuts?
                </p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
            <div className="col-sm-6 col-sm-offset-1">
              <div className="reg-form-container">
                <div className="reg-options">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#register" data-toggle="tab">
                        Register
                      </a>
                    </li>
                    <li>
                      <a href="#login" data-toggle="tab">
                        Login
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pane active" id="register">
                    <h3>Register Now !!!</h3>
                    <p className="text-muted">Join today!!</p>
                    <form
                      name="registration_form"
                      id="registration_form"
                      className="form-inline"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="row">
                        <div className="form-group col-xs-6">
                          <label htmlFor="firstname" className="sr-only">
                            First Name
                          </label>
                          <input
                            id="firstname"
                            className="form-control input-group-lg"
                            type="text"
                            name="firstName"
                            title="Enter first name"
                            placeholder="First name"
                            value={register.firstName}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                        <div className="form-group col-xs-6">
                          <label htmlFor="lastname" className="sr-only">
                            Last Name
                          </label>
                          <input
                            id="lastname"
                            className="form-control input-group-lg"
                            type="text"
                            name="lastName"
                            title="Enter last name"
                            placeholder="Last name"
                            value={register.lastName}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            id="email"
                            className="form-control input-group-lg"
                            type="email"
                            name="email"
                            title="Enter Email"
                            placeholder="Your Email"
                            value={register.email}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            id="password"
                            className="form-control input-group-lg"
                            type="password"
                            name="password"
                            title="Enter password"
                            placeholder="Password"
                            value={register.password}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <p className="birth">
                          <strong>Date of Birth</strong>
                        </p>
                        <div className="form-group col-xs-6 col-md-6">
                          <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={dateOfBirth}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="Select Your DOB"
                            required
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                        <div className="form-group col-xs-6">
                          <label htmlFor="firstname" className="sr-only">
                            Phone Number
                          </label>
                          <input
                            id="phonenumber"
                            className="form-control input-group-lg"
                            type="number"
                            name="phoneNumber"
                            title="Enter Phone Numbrt"
                            placeholder="Phone Number"
                            value={register.phoneNumber}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-xs-6">
                          <label htmlFor="city" className="sr-only">
                            City
                          </label>
                          <input
                            id="city"
                            className="form-control input-group-lg reg_name"
                            type="text"
                            name="city"
                            title="Enter city"
                            placeholder="Your city"
                            value={register.city}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                        <div className="form-group col-xs-6">
                          <div className="form-group gender">
                            <label className="radio-inline">
                              <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={register.gender === "Male"}
                                onChange={inputEvent}
                                required
                              />
                              Male
                            </label>
                            <label className="radio-inline">
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={register.gender === "Female"}
                                onChange={inputEvent}
                                required
                              />
                              Female
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-xs-6">
                          <label htmlFor="password" className="sr-only">
                            Degree Name
                          </label>
                          <input
                            id="degreeName"
                            className="form-control input-group-lg"
                            type="text"
                            name="degreeTitle"
                            title="Enter Degree Name"
                            placeholder="Degree"
                            value={register.degreeTitle}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                        <div className="form-group col-xs-6">
                          <label htmlFor="password" className="sr-only">
                            University Name
                          </label>
                          <input
                            id="universityName"
                            className="form-control input-group-lg"
                            type="text"
                            name="universityName"
                            title="Enter University Name"
                            placeholder="University"
                            value={register.universityName}
                            onChange={inputEvent}
                            required
                          />
                        </div>
                        <div className="form-group col-xs-6">

<p className="birth">
  <strong>Profile Picture</strong>
</p>
  <input
type="file"
className="file"
name="fileID_F"
onChange={documentEvent}
id={1}
accept="image/x-png,image/gif,image/jpeg"
required
/>
</div>
                     
                        
                       
                      </div>
                      {/* <p>
                        <NavLink to="/register#login">Already have an account?</NavLink>
                      </p> */}

                      <button className="btn btn-primary" type="submit">
                        Register Now
                      </button>
                      {isRegisterLoading ? (
                        <div className="loading">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : null}
                      {message.registerError ? (
                        <p className="error">{message.registerError}</p>
                      ) : null}
                      {message.registerSuccess ? (
                        <p className="success">{message.registerSuccess}</p>
                      ) : null}
                    </form>
                  </div>
                  <div className="tab-pane" id="login">
                    <h3>Login</h3>
                    <p className="text-muted">Log into your account</p>

                    <form
                      name="Login_form"
                      action="#"
                      id="Login_form"
                      onSubmit={handleFormLogin}
                    >
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="my-email" className="sr-only">
                            Email
                          </label>
                          <input
                            id="my-email"
                            className="form-control input-group-lg"
                            type="email"
                            name="email"
                            title="Enter Email"
                            placeholder="Your Email"
                            value={login.email}
                            onChange={loginInputEvent}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="my-password" className="sr-only">
                            Password
                          </label>
                          <input
                            id="my-password"
                            className="form-control input-group-lg"
                            type="password"
                            name="password"
                            title="Enter password"
                            placeholder="Password"
                            value={login.password}
                            onChange={loginInputEvent}
                            required
                          />
                        </div>
                      </div>
                      <p>
                      <NavLink exact to="/forgot-password-form">Forgot Password</NavLink>
                      </p>
                      <button className="btn btn-primary" type="submit">
                        Login Now
                      </button>
                      {isLoading ? (
                        <div className="loading">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : null}
                      {message.loginError ? (
                        <p className="error">{message.loginError}</p>
                      ) : null}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-6">
              <ul className="list-inline social-icons">
                <li>
                  <a href="#">
                    <i className="icon ion-social-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon ion-social-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon ion-social-googleplus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon ion-social-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon ion-social-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};
export default RegistrationAndLoginForm;
