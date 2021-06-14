import React, { useState } from "react";
import { Container, Row, Col ,Spinner} from "react-bootstrap";
 import { useHistory,useParams } from "react-router-dom";
 import axiosConfig from "../../Config/axiosConfig"
const ForgotPasswordForm  = () =>{
    const [forgotPass, setForgotPass] = useState({
        verificationCode: "",
        password:""
      });
      const [cPass,setCPass] = useState({
          cpass:""
      });
      const [isLoading,setIsLoading] = useState(false)
      const [passError,setPassError] = useState("");
      const [successMessage,setSuccessMessage] = useState("")
    //   console.log(forgotPass)
    //   console.log(cPass)

       const [error, setError] = useState();
       let history = useHistory();
    
       const { forgotEmail } = useParams();
    //    console.log(forgotEmail)

      const handlePassSubmit = (e) => {
         e.preventDefault();
         setIsLoading(true)
        if (passValid()){         
            axiosConfig.post(`/students/forgotpassword/changepassword/${forgotEmail}`,
            forgotPass)
            .then(response => {
                if (response.status===200) {
                  setError("");
                   history.push("/register");
                   setIsLoading(false)
                  setSuccessMessage(response.data.message);
                }
              })
    
         .catch((error)=>{
           setError(error.response.data.message)
          })
    }
    else{
        setError("");
        setSuccessMessage("")
        setIsLoading(false)
      }
      };
    const passValid = () =>{
    let isValid = true;
    if (forgotPass.password !== "undefined" && cPass.cpass !== "undefined") {
          
      if (forgotPass.password !== cPass.cpass) {
        isValid = false;
        setPassError("Passwords do not match")
      }
    } 
    return isValid;
  }

    
      const codeEvent = (e) => {
        const { name, value } = e.target;
    
        setForgotPass((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
        setCPass((preValue) => {
            return {
              ...preValue,
              [name]: value,
            };
          });
      };
    return(
        <>
        <div className="emailVerification">
        <Container>
          <Row>
            <Col lg={12} md={12}>
              <form onSubmit={handlePassSubmit}>
                <div className="verificationForm">
                  <h1>New Password</h1>
                  <p>
                    Change to your new password and write the verification code sent to your email to validate yourself
                  </p>
                  <div className="forgotFields">
                  <label>Verification Code</label>
                  <input
                    type="text"
                    name="verificationCode"
                    value={forgotPass.verificationCode}
                    onChange={codeEvent}
                    required
                  />
                  </div>
                  <div className="forgotFields">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={forgotPass.password}
                    onChange={codeEvent}
                    required
                  />
                      </div>
                  <div className="forgotFields">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="cpass"
                    value={cPass.cpass}
                    onChange={codeEvent}
                    required
                  />
                      </div>
                  
                   
                  <button type="submit">Submit</button>
                  {isLoading ? (
            <div className="loading">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : null}
                  {passError ? (
                      <p className="error">{passError}</p>
                  ):null}
                  {error ? (
                      <p className="error">{error}</p>
                  ):null}
                  {successMessage ? (
                      <p className="success">{successMessage}</p>
                  ):null}
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
        </>
    )
}
export default ForgotPasswordForm;