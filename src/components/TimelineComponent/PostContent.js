import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosConfig from "../../Config/axiosConfig";
import { nanoid } from "nanoid";
import Cookies from "universal-cookie";
// import sarah from "../../images/sarah.jpg";
// import post1 from "../../images/post1.jpg"
// import post2 from "../../images/post2.jpg"
// import john from '../../images/john.jpg'
// import diana from "../../images/diana.jpg"
const PostContent = () => {
  const cookies = new Cookies();
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const [getRequest, setGetRequest] = useState(false);
  const [postData, setPostData] = useState([]);
  // console.log(student);
  useEffect(() => {
    axiosConfig
      .get(`/posts/studentposts/${student.student._id}`)
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setPostData(response.data.data);
        }
      });
  }, []);
  const deletePost = (postBody, attachment, id) => {
    let deleteList = { postBody: postBody, attachment: attachment };
    axiosConfig
      .post(`/posts/delete/${student.student._id}/${id}`, deleteList)
      .then((res) => {
        if (res.status === 200) {
          setGetRequest(!getRequest);
          const del = postData.filter((postData) => id !== postData._id);
          setPostData(del);
          // console.log(res.data)
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      {postData.length > 0 ? (
        postData.map((data) => {
          return (
            <>
              <div className="post-content" key={nanoid()}>
                {/* <!--Post Date--> */}
                <div className="post-date hidden-xs hidden-sm">
                  <h5>{data.firstName}</h5>
                  <p className="text-grey">{data.createdAt.split("-")[0]}</p>
                </div>
                {/* <!--Post Date End--> */}
                {data.attachment ? (
                  <img
                    src={data.attachment}
                    alt="post"
                    className="img-responsive post-image"
                  />
                ) : (
                  ""
                )}

                <div className="post-container">
                  <img
                    src={student.student.profilePicture}
                    alt="user"
                    className="profile-photo-md pull-left"
                  />
                  <div className="post-detail">
                    <div className="user-info">
                      <h5>
                        <NavLink to="/timeline" className="profile-link" style={{textTransform:"capitalize"}}>
                          {data.firstName} {data.lastName}
                        </NavLink>
                        {/* <span className="following">{data.followage ? "following" : "follow"}</span> */}
                      </h5>
                      <p className="text-muted">Posted On: {data.createdAt}</p>
                    </div>

                    <div className="reaction">
                      <p className="btn text-green">
                        <i className="icon ion-thumbsup"></i> 43
                      </p>
                      <p className="btn text-red">
                        <i className="fa fa-thumbs-down"></i> 44
                      </p>
                    </div>
                    <div className="delete__post">
                      <button
                        onClick={() =>
                          deletePost(data.postBody, data.attachment, data._id)
                        }
                      >
                        Delete Post
                      </button>
                    </div>

                    <div className="line-divider"></div>
                    <div className="post-text">
                      <p>
                        {data.postBody}
                        <i className="em em-anguished"></i>
                        <i className="em em-anguished"></i>
                        <i className="em em-anguished"></i>
                      </p>
                    </div>
                    <div className="line-divider"></div>

                    {/* {CommentData.map((commentData)=>{
                      return(
                          <>
                          <div className="post-comment" key={nanoid()}>
                            <img
                            src={commentData.commentPic}
                            alt=""
                            className="profile-photo-sm"
                            />
                            <p>
                            <NavLink to={commentData.profileLink} className="profile-link">
                               {commentData.commentor}:
                            </NavLink>
                            <i className="em em-laughing"></i>{commentData.comment}
                            </p>
                        </div>
                          </>
                      )
                  })} */}

                    <div className="post-comment">
                      <img src={student.student.profilePicture} alt="" className="profile-photo-sm" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Post a comment"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <h1 className="text-center">No Posts Found</h1>
      )}
    </>
  );
};
export default PostContent;
