import React, { Fragment, useState } from "react";
import {Spinner} from "react-bootstrap"
import { nanoid } from "nanoid";
import Cookies from "universal-cookie";
import axiosConfig from "../../Config/axiosConfig";
const FriendRequest = () => {
  const cookies = new Cookies();
  let student =JSON.parse(localStorage.getItem("newStudent"))
  const [message,setMessages] = useState({
    successAccept:"",
    successDecline:""
  });
  const [isLoading,setIsLoading] = useState(false)
  const fetchData = () =>{
    axiosConfig
    .get(`/students/${student.student._id}`)
    .then(function (response) {
      if(response.status === 200){
        localStorage.setItem("newStudent",JSON.stringify(response.data.data))
      }
    })
  }
  const acceptRequest = (id) => {
    setIsLoading(true)
    setMessages({
      successAccept: "",
      successDecline:""
    });
    axiosConfig
    .post(`/students/approverequest/${student.student._id}/${id}`)
    .then(function (response) {
      if (response.status === 200) {
        //  console.log(response.data)
        fetchData()
        setIsLoading(false)
        setMessages({
          successAccept: response.data.message,
          successDecline:""
        });
      }
    })
  };
  const declineRequest = (id) => {
    setMessages({
      successAccept: "",
      successDecline:""
    });
    setIsLoading(true)
    axiosConfig
    .post(`/students/deleterequest/${student.student._id}/${id}`)
    .then(function (response) {
      if (response.status === 200) {
        //  console.log(response.data)
        fetchData()
        setIsLoading(false)
        setMessages({
          successAccept:"",
          successDecline: response.data.message,
        });
      }
    })
  };
  return (
    <>
      <div className="friend_request">
        {student.friendRequests.length > 0 ? student.friendRequests.map((data) => {
          return (
            <Fragment key={nanoid()}>
              <div className="friend__request__notification">
                <h1 style={{ textTransform: "capitalize" }}>
                  {data.firstName} {data.lastName}{" "}
                  <span> sent you a friend request</span>
                </h1>
                <div className="decision__button">
                  <button onClick={() => acceptRequest(data._id)}>Accept</button>
                  <button onClick={() => declineRequest(data._id)}>Decline</button>
                </div>
              </div>
            </Fragment>
          );
        }):null}
        {message.successAccept ? (
          <p className="success">{message.successAccept}</p>
        ) : null}
        {message.successDecline ? (
          <p className="success">{message.successDecline}</p>
        ) : null}
        {isLoading ? (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
            </div>
        ):null}
      </div>
    </>
  );
};
export default FriendRequest;
