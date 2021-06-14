import React from "react"
import {NavLink} from "react-router-dom"
import sarah from "../../images/sarah.jpg"
import Cookies from "universal-cookie"
const ProfileCard = () =>{
    const cookies = new Cookies();
    let student = JSON.parse(localStorage.getItem("newStudent"))
    console.log("here")
    console.log(student)
    return(
        <>
        <div class="profile-card">
            	<img src={student.student.profilePicture} alt="user" class="profile-photo" />
            	<h5><NavLink to="/timeline" class="text-white" style={{textTransform:"capitalize" }}>{student.student.firstName} {student.student.lastName}</NavLink></h5>
            	<NavLink to="#" class="text-white"><i class="ion ion-android-person-add"></i> {student.student.friends.length} Friends</NavLink>
            </div>
        </>
    )
}
export default ProfileCard;
