import React,{useState} from "react"
import axiosConfig from "../../Config/axiosConfig"
import {useHistory} from "react-router-dom"
import {Button,Form,Spinner} from "react-bootstrap"
const ForgotPasswordModal = ({isStudentAuth}) => {
    let history = useHistory();
     /*Forgot Password */
  const [isForgotPassLoading,setIsForgotPassLoading] = useState(false)
  const [forgotPassError,setForgotPassError] = useState("")
  const [forgotEmail, setForgotEmail] = useState({
    email: "",
  });
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setIsForgotPassLoading(true);
    axiosConfig
      .post(`/students/forgotpassword`, forgotEmail)
      .then((response) => {
        if (response.status === 200) {
          isStudentAuth = true;
          setIsForgotPassLoading(false);
          setForgotPassError("");
          localStorage.setItem("studentSignup", isStudentAuth);
          history.push({
            pathname: `/forgot-password/${forgotEmail.email}`,
            state: forgotEmail.email,
          });
        }
      })

      .catch((error) => {
        setIsForgotPassLoading(false);
        setForgotPassError(error.response.data.message);
        // // console.log(error)
      });
  };
  const forgotEvent = (e) => {
    const { name, value } = e.target;

    setForgotEmail((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
    return(
        <>
        <div className="forgot_password">
            <h1>Forgot Password?</h1>
            <p> Don't worry, just write your email and a new password will be sent
          directly to it!</p>
          <Form onSubmit={handleForgotSubmit}>
          <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={forgotEvent}
                name="email"
                value={forgotEmail.email}
                required
              />
              <Form.Text className="text-muted">
                Write the email you registered with!!
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Verify Email
            </Button>
            {isForgotPassLoading ? (
            <div className="loading">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : null}
          {forgotPassError !== "" ? (
            <Form.Text className="text-muted forgotPassError">
              {forgotPassError}
            </Form.Text>
          ) : // <p>{forgotPassError}</p>
          null}
          </Form>
        </div>

        </>
    )
}
export default ForgotPasswordModal;