import { nanoid } from "nanoid";
import React, { Fragment,useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import {Spinner} from "react-bootstrap"
import Profile from "../../images/profileImg.png"
import Cookies from "universal-cookie";
import axiosConfig from "../../Config/axiosConfig";
const NewsFeedSuggestion = () => {
  const cookies = new Cookies();
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const [suggestions, setSuggestions] = useState([]);
  const [messages,setMessages] = useState({
    success:"",
}) 
const [isLoading,setIsLoading] =useState(false)
const [error,setError] = useState({
  friend:"",
  cancel:""
});
const fetchData = () =>{
  axiosConfig
      .get(`/students/${student.student._id}`)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem("newStudent",JSON.stringify(response.data.data), {
            path: "/",
          });

        }
      });
}
  const getStudents = () => {
    axiosConfig.get(`/students`).then(function (response) {
        if (response.status === 200) {
            setSuggestions(response.data.data);
            // console.log(response.data.data)
        }
      });
  }

  useEffect(() => {
    getStudents();
    fetchData();
 }, []);
 const friendRequest=(id)=>{
  setIsLoading(true)
  axiosConfig
    .post(`/students/sendrequest/${student.student._id}/${id}`)
    .then(function (response) {
      if (response.status === 200) {
        //  console.log(response.data)
         setIsLoading(false)
        setMessages({
          success: response.data.message,
        });
      }
    })
    .catch(function(err){
      setIsLoading(false)
      setError({cancel:err.response.data.message,friend:""})
    })
}
const cancelFriendRequest=(id)=>{
  setMessages({
    success:"",
  });
  setIsLoading(true)
    axiosConfig
      .post(`/students/cancelrequest/${student.student._id}/${id}`)
      .then(function (response) {
        if (response.status === 200) {
          fetchData()
          setIsLoading(false)
          setMessages({
            success: response.data.message,
          });
          setError({friend:"",cancel:""})
        }
      })
      .catch(function(err){
        setIsLoading(false)
        setError({cancel:err.response.data.message,friend:""})
      })
 }
 const [isPresent, setIsPresent] = useState([]);
 const [isFriend, setIsFriend] = useState([]);
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
  return (
    <>
      <div class="suggestions" id="sticky-sidebar">
        <h4 class="grey">Who to Follow</h4>
        {suggestions.filter(suggestion => suggestion._id !== student.student._id).map((data,index) => {
          return (
            <Fragment key={nanoid()}>
               {friendFilter(index) ? (
              <div class="follow-user">
                <img
                  src={data.profilePicture}
                  alt={data.firstName}
                  class="profile-photo-sm pull-left"
                />
                <div>
                  <h5>
                    <NavLink to="#">{data.firstName} {data.lastName}</NavLink>
                  </h5>
                  {requestFilter(index) ? (
                    <button onClick={()=>cancelFriendRequest(data._id)} class="add__friend_suggestion">
                   Cancel Request
                  </button>
                  ):(
                  <button onClick={()=>friendRequest(data._id)} class="add__friend_suggestion">
                    Add friend
                  </button>
                  )}
                  
                </div>
              </div>
               ): null}
            </Fragment>
          );
        })}
        {error.friend ? (
            <p className="error">{error.friend}</p> 
        ): null}
        {error.cancel ? (
            <p className="error">{error.cancel}</p> 
        ): null}
        {messages.success ? (
            <p className="success">{messages.success}</p> 
        ): null}
        {isLoading ? (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
            </div>
        ): null}
      </div>
    </>
  );
};
export default NewsFeedSuggestion;
