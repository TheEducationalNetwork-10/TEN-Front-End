import React,{Fragment} from "react";
import { NavLink } from "react-router-dom";
import {nanoid} from "nanoid"
import Cookies from "universal-cookie"
const ProfileNotification = () => {
  const cookies = new Cookies();
  let student  = JSON.parse(localStorage.getItem("newStudent"))
  const ProfileNotificationData = [
    {
      link: "#",
      activity: "Commented on a Photo",
     
      time: "5 mins ago",
    },
    {
      link: "#",
      activity: " Has posted a photo",
     
      time: "an hour ago",
    },
    {
      link: "#",
      activity: "Liked a friend's post",
     
      time: "4 hours ago",
    },
    {
      link: "#",
      activity: "has shared an album",
     
      time: "a day ago",
    },
  ];
  return (
    <>
      <div id="sticky-sidebar">
        <h4 class="grey" style={{textTransform:"capitalize"}}>{student.student.firstName}'s activity</h4>
        {ProfileNotificationData.map((data) => {
          return (
            <Fragment key={nanoid()}>
              <div class="feed-item" >
                <div class="live-activity">
                  <p>
                    <NavLink to={data.link} class="profile-link" style={{textTransform:"capitilize"}}>
                      {student.student.firstName}
                    </NavLink>{" "}
                    {data.activity}
                  </p>
                  <p class="text-muted">{data.time}</p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
export default ProfileNotification;
