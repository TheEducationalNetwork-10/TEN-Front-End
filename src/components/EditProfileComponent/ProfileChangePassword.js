import React,{useState} from "react";
// import { NavLink } from "react-router-dom";
import {Spinner} from "react-bootstrap"
import axiosConfig from "../../Config/axiosConfig"
import Cookies from "universal-cookie"
const ProfileChangePassword = () => {
  const cookies = new Cookies();
  let student= JSON.parse(localStorage.getItem("newStudent"))
  const [changePass, setChangePass] = useState({
    newpassword: "",
    oldpassword: "",
  });
  const [newPass, setNewPass] = useState({
    cNewPass: "",
  });
  // console.log(changePass)
  // console.log(newPass)
  const [newPassError, setNewPassError] = useState("");
  const [newPassSuccess, setNewPassSuccess] = useState("");
  const [isChangePassLoading, setIsChangePassLoading] = useState(false);
  //Change Password Comparison Validation
  const passValid = () => {
    let isValid = true;
    if (
      changePass.newpassword !== "undefined" &&
      newPass.cNewPass !== "undefined"
    ) {
      if (changePass.newpassword !== newPass.cNewPass) {
        isValid = false;
        setNewPassError("Passwords do not match");
      }
    }
    return isValid;
  };
  const handleChangePassSubmit = (e) => {
    e.preventDefault();
    setIsChangePassLoading(true);
    if (passValid()) {
      axiosConfig
        .post(
          `/students/changepassword/${student.student._id}`,
          changePass
        )
        .then(function (response) {
          if (response.status === 200) {
            setNewPassSuccess(response.data.message);
            setIsChangePassLoading(false);
            setNewPass({
              cNewPass: "",
            });
            setChangePass({
              newpassword: "",
              oldpassword: "",
            });
            setNewPassError("");
          }
        })
        .catch((error) => {
          setNewPassError(error.response.data.message);
          setIsChangePassLoading(false);
          setNewPassSuccess("");
          setNewPass({
            cNewPass: "",
          });
          setChangePass({
            newpassword: "",
            oldpassword: "",
          });
        });
    } else {
      setIsChangePassLoading(false);
      setNewPassSuccess("");
      setNewPass({
        cNewPass: "",
      });
      setChangePass({
        newpassword: "",
        oldpassword: "",
      });
    }
  };
  //Handling input fields
  const handleInputs = (e) => {
    const { name, value } = e.target;

    setChangePass((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
    setNewPass((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div class="edit-profile-container">
        <div class="block-title">
          <h4 class="grey">
            <i class="icon ion-ios-locked-outline"></i>Change Password
          </h4>
          <div class="line"></div>
          <p>
            If you want to change your old password you have come to the right place!!
            </p>
        </div>
        <div class="edit-block">
          <form name="update-pass" id="education" class="form-inline" onSubmit={handleChangePassSubmit}>
            <div class="row">
              <div class="form-group col-xs-12">
                <label for="my-password">Old password</label>
                <input
                  id="my-password"
                  class="form-control input-group-lg"
                  type="password"
                  name="oldpassword"
                  value={changePass.oldpassword}
                  onChange={handleInputs}
                  title="Enter password"
                  placeholder="Old password"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-xs-6">
                <label>New password</label>
                <input
                  class="form-control input-group-lg"
                  type="password"
                  name="newpassword"
                  title="Enter password"
                  value={changePass.newpassword}
                  onChange={handleInputs}
                  required
                  placeholder="New password"
                />
              </div>
              <div class="form-group col-xs-6">
                <label>Confirm password</label>
                <input
                  class="form-control input-group-lg"
                  type="password"
                  name="cNewPass"
                  title="Enter password"
                  value={newPass.cNewPass}
                  onChange={handleInputs}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Update Password</button>
            {isChangePassLoading ? (
              <div className="loading">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : null}
            {newPassError ? <p className="error">{newPassError}</p> : null}
            {newPassSuccess ? (
              <p className="success">{newPassSuccess}</p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};
export default ProfileChangePassword;
