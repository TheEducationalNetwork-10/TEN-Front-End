import { nanoid } from "nanoid";
import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import profile from "../../images/profileImg.png";
import Cookies from "universal-cookie";
import axiosConfig from "../../Config/axiosConfig";
const PeopleNearby = () => {
  const cookies = new Cookies();
  let student = JSON.parse(localStorage.getItem("newStudent"));
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState({
    success: "",
  });
  const getStudents = () => {
    axiosConfig.get(`/students`).then(function (response) {
      if (response.status === 200) {
        setSuggestions(response.data.data);
        //  console.log(response.data.data)
      }
    });
  };
  const fetchData = () => {
    axiosConfig
      .get(`/students/${student.student._id}`)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem(
            "newStudent",
            JSON.stringify(response.data.data),
            {
              path: "/",
            }
          );
        }
      });
  };
  useEffect(() => {
    getStudents();
    fetchData();
  }, []);
  const [error, setError] = useState({
    friend: "",
    cancel: "",
  });
  const friendRequest = (id) => {
    setMessages({
      success: "",
    });
    setIsLoading(true);
    axiosConfig
      .post(`/students/sendrequest/${student.student._id}/${id}`)
      .then(function (response) {
        if (response.status === 200) {
          setIsLoading(false);
          fetchData();
          setMessages({
            success: response.data.message,
          });
          setError({ friend: "", cancel: "" });
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        setError({ friend: err.response.data.message, cancel: "" });
      });
  };
  const cancelFriendRequest = (id) => {
    setMessages({
      success: "",
    });
    setIsLoading(true);
    axiosConfig
      .post(`/students/cancelrequest/${student.student._id}/${id}`)
      .then(function (response) {
        if (response.status === 200) {
          fetchData();
          setIsLoading(false);
          setMessages({
            success: response.data.message,
          });
          setError({ friend: "", cancel: "" });
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        setError({ cancel: err.response.data.message, friend: "" });
      });
  };
  const [isPresent, setIsPresent] = useState([]);
  const [isFriend, setIsFriend] = useState([]);
  //  const [isIndex,setIsIndex] = useState([])
  const requestFilter = (suggestionInd) => {
    if(student.requestsSent.length > 0){
      for (let i = 0; i < student.requestsSent.length; i++) {
        if (
          suggestions[suggestionInd]._id === student.requestsSent[i]._id
        ) {
          isPresent.push(true);
        } else {
          isPresent.push(false);
        }
      }
      return isPresent[suggestionInd];
    }
    else {
      return;
    }
  };
  const friendFilter = (suggestionInd) => {
    //  console.log(suggestionInd)
    for (let i = 0; i < student.friends.length; i++) {
      if (suggestions[suggestionInd]._id === student.friends[i]._id) {
        isFriend.push(false);
      } else {
        isFriend.push(true);
      }
    }
    return isFriend[suggestionInd];
  };

  // useEffect(()=>{
  //   if(isIndex > -1){
  //     requestFilter(isIndex);
  //   }

  // },[isIndex])
  // console.log(student);
  return (
    <>
      <div class="people-nearby">
        <h1 className="text-center">People You May Know</h1>
        {suggestions
          .filter((suggestion) => suggestion._id !== student.student._id)
          .map((data, index) => {
            return (
              <Fragment key={nanoid()}>
                {friendFilter(index) ? (
                  <>
                    <div class="nearby-user">
                      <Row>
                        <Col md={2} sm={2}>
                          <img
                            src={data.profilePicture}
                            alt={data.firstName}
                            class="profile-photo-lg"
                          />
                        </Col>
                        <Col md={7} sm={7}>
                          <h5>
                            <NavLink to="#" class="profile-link">
                              {data.firstName} {data.lastName}
                            </NavLink>
                          </h5>
                          <p style={{ textTransform: "capitalize" }}>
                            Studies At: {data.universityName}
                          </p>
                          <p className="text-muted">From: {data.city}</p>
                        </Col>
                        <Col md={3} sm={3}>
                          {/* {isIndex.push(index) } */}
                          {requestFilter(index) ? (
                            <button
                              onClick={() => cancelFriendRequest(data._id)}
                              className="btn btn-primary pull-right"
                            >
                              Cancel Request
                            </button>
                          ) : (
                            <button
                              onClick={() => friendRequest(data._id)}
                              className="btn btn-primary pull-right"
                            >
                              Add A Friend
                            </button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : null}
              </Fragment>
            );
          })}
        {messages.success ? (
          <p className="success">{messages.success}</p>
        ) : null}
        {error.friend ? <p className="error">{error.friend}</p> : null}
        {error.cancel ? <p className="error">{error.cancel}</p> : null}
        {isLoading ? (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default PeopleNearby;
