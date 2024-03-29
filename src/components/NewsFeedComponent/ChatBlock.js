import React, { Fragment, useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
// import Profile from "../../images/profileImg.png";
// import Cookies from "universal-cookie"
import {Spinner} from "react-bootstrap"
import axiosConfig from "../../Config/axiosConfig"
import {nanoid} from "nanoid";
const ChatBlock = () => {
  // const cookies = new Cookies();
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const [users,setUsers] = useState([])
  const fetchUsers = () =>{
    axiosConfig
    .get("/students")
    .then(function (response) {
      // console.log(response.data.data)
      setUsers(response.data.data)
    })
  }
  useEffect(() => {
    fetchUsers();
  },[])
  return (
    <>
      <div id="chat-block">
        <div class="title">Chat online</div>
        <ul class="online-users list-inline">
          {users.length > 0 ? users.filter(users => users._id !== student.student._id).map((data) => {
            return (
              <Fragment key={nanoid()}>
                {data.isApproved ? (
                  <li>
                  <NavLink to="/newsfeed-messages" title={data.firstName}>
                    <img
                      src={data.profilePicture}
                      alt={data.firstName}
                      class="img-responsive profile-photo"
                    />
                    <span class="online-dot"></span>
                  </NavLink>
                </li>
                ): null}
                
              </Fragment>
            );
          }):(
            <div className="loading">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
export default ChatBlock;
