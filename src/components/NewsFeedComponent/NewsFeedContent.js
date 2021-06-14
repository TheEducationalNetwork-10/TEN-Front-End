import { nanoid } from "nanoid";
import React, { Fragment,useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import axiosConfig from "../../Config/axiosConfig"
// import diana from "../../images/diana.jpg";
// import john from "../../images/john.jpg";
// import sarah from "../../images/sarah.jpg";
import profile from "../../images/profileImg.png"
const NewsFeedContent = () => {
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const [posts,setPosts] = useState([])
  const fetchPosts = () =>{
    axiosConfig
    .get("/posts")
    .then(function (response){
      if(response.status === 200){
        setPosts(response.data.data)
        // console.log(response.data.data)
      }
    })
    .catch(function(err){
      console.log(err.response.data.message)
    })
  }
  useEffect(() => {
    fetchPosts();
  },[])


  return (
    <>
      {posts.map((postData) => {
        return (
          <Fragment key={nanoid()}>
            <div class="post-content">
                {/* {postData.isPost ? (
                    <>
                    {postData.isImg ? (
                        <img
                    src={postData.postSrc}
                    alt="post"
                    class="img-responsive post-image"
                    />
                    ) : (
                    <div className="video-wrapper">
                        <video class="post-video" controls> <source src={postData.postSrc} type="video/mp4"/> </video>
                    </div>
                    )}
                    </>
                ) : ""} */}
                 {postData.attachment ? (
                        <img
                    src={postData.attachment}
                    alt="post"
                    class="img-responsive post-image"
                    />
                    ): null}
                
              
              <div class="post-container">
                <img
                  src={profile}
                  alt="user"
                  class="profile-photo-md pull-left"
                />
                <div class="post-detail">
                  <div class="user-info">
                    <h5>
                      <NavLink to="#" class="profile-link">
                        {postData.firstName} {postData.lastName}
                      </NavLink>
                      <span class="following">
                        Add Friend
                      </span>
                    </h5>
                    <p class="text-muted">Updated Their Status</p>
                  </div>
                  <div class="reaction">
                    <p class="btn text-green">
                      <i class="icon ion-thumbsup"></i> 47
                    </p>
                    <p class="btn text-red">
                      <i class="fa fa-thumbs-down"></i> 82
                    </p>
                  </div>
                  <div class="line-divider"></div>
                  <div class="post-text">
                    <p>
                      {postData.postBody}
                      <i class="em em-anguished"></i>
                      <i class="em em-anguished"></i>
                      <i class="em em-anguished"></i>
                    </p>
                  </div>
                  <div class="line-divider"></div>
                  {/* {postData.postComments.map((commentData) => {
                    return (
                      <Fragment key={nanoid()}>
                        <div class="post-comment">
                          <img
                            src={commentData.commentPic}
                            alt={commentData.commentor}
                            class="profile-photo-sm"
                          />
                          <p>
                            <NavLink
                              to={commentData.profileLink}
                              class="profile-link"
                            >
                              {commentData.commentor}
                            </NavLink>
                            {commentData.comment}
                          </p>
                        </div>
                      </Fragment>
                    );
                  })} */}
                  <div class="post-comment">
                    <img src={student.student.profilePicture} alt="" class="profile-photo-sm" />
                    <input type="text" class="form-control" placeholder="Post a comment"/>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
export default NewsFeedContent;
