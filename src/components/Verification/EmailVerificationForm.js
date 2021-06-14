import React, { useState, useEffect } from "react";
import { Container, Row, Col,Spinner } from "react-bootstrap";
import { useHistory,useParams } from "react-router";
import axiosConfig from "../../Config/axiosConfig"
const EmailVerificationForm = () =>{
    const [verification, setVerification] = useState({
        verificationCode: "",
      });
     
      // console.log(verification)
      const [isDisabled, setIsDisabled] = useState(false);
      const [error, setError] = useState();
      const [resendError, setResendError] = useState();
      const [isLoading,setIsLoading]=useState(false)
      let history = useHistory();
    
      const { studentID } = useParams();
    
      const handleVerificationSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
            axiosConfig.post(`/students/verification/${studentID}`,
            verification)
            .then(response => {
                if (response.status===200) {
                  setError("");
                  history.push({
                    pathname: `/register`,
                  }); 
                  // history.push("/food-dashboard");
                  setIsLoading(false);
                }
              })
    
         .catch((error)=>{
          setIsLoading(false);
           setError(error.response.data.message)
          })
         
      };
    
      useEffect(() => {
        if (isDisabled) {
          setTimeout(() => {
            setIsDisabled(false);
          }, 50000);
        }
      }, [isDisabled]);
    
      const resetTimer = (e) => {
        setIsDisabled(true);
        e.preventDefault();
            axiosConfig.post(`/students/resendCode/${studentID}`)
            .then(response => {
                if (response.status===200) {
                  setResendError("");
                }
              })
    
         .catch((error)=>{
          setResendError(error.response.data.message)
          })
         
      };
    
      const codeEvent = (e) => {
        const { name, value } = e.target;
    
        setVerification((preValue) => {
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
              <form onSubmit={handleVerificationSubmit}>
                <div className="verificationForm">
                  <h1>Email Verification</h1>
                  <p>
                    A code has been to the email provided by you please write it
                    to verify yourself as a user
                  </p>
                  <input
                    type="text"
                    name="verificationCode"
                    value={verification.verificationCode}
                    onChange={codeEvent}
                    required
                  />
                  <button type="submit">Submit</button>
                  <button onClick={resetTimer} disabled={isDisabled}>
                    Resend Code
                  </button>
                </div>
                {isDisabled ? (
                  <div className="time">
                    <p>You can resend the code again after 5 minutes</p>
                  </div>
                ) : null}
                {isLoading ? (
                <div className="loading">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : null}
                <p>{error}</p>
                <p>{resendError}</p>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
        </>
    )
}
export default EmailVerificationForm;