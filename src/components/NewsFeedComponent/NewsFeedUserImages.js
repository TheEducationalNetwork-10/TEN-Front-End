import React, { Fragment,useState, useEffect} from "react";
import Diana from "../../images/diana.jpg";
import John from "../../images/john.jpg";
import { Row, Col } from "react-bootstrap";
import Sarah from "../../images/sarah.jpg";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import profile from "../../images/profileImg.png"
import axiosConfig from "../../Config/axiosConfig"
const NewsFeedUserImages = () => {
  const [posts,setPosts] = useState([])
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const fetchPosts = () =>{
    axiosConfig
    .get("/posts")
    .then(function (response){
      if(response.status === 200){
        setPosts(response.data.data)
         console.log(response.data.data)
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
      <div className="media">
        <Row
          className="js-masonry"
          data-masonry='{ "itemSelector": ".grid-item", "columnWidth": ".grid-sizer", "percentPosition": true }'
        >
          {posts.map((data,index) => {
            return (
              
              <Fragment key={nanoid()}>
                {data.attachment ? (
                <Col md={6} sm={6} className="grid-item" style={{marginBottom:'10px'}}>
                <div className="media-grid" style={{height:'100%'}}> 
                  <div
                    className="img-wrapper"
                    data-toggle="modal"
                    data-target={`.modal-${index+1}`}
                  >
                    <img
                      src={data.attachment}
                      alt="post"
                      className="img-responsive post-image"
                    />
                  </div>
                  <div className="media-info">
                    <div className="reaction">
                      <p className="btn text-green">
                        <i className="fa fa-thumbs-up"></i> 57
                      </p>
                      <p className="btn text-red">
                        <i className="fa fa-thumbs-down"></i> 32
                      </p>
                    </div>
                    <div className="user-info">
                      <img
                        src={profile}
                        alt={data.firstName}
                        className="profile-photo-sm pull-left"
                      />
                      <div className="user">
                        <h6>
                          <NavLink to="#" className="profile-link" style={{textTransform:"capitalize" }}>
                            {data.firstName} {data.lastName}
                          </NavLink>
                        </h6>
                        {/* <NavLink className="text-green" to="#">
                          Add Friend
                        </NavLink> */}
                      </div>
                    </div>
                  </div>

                  {/* <!--Popup--> */}
                  <div
                    className={`modal fade modal-${index+1}`}
                    tabindex="-1"
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="post-content">
                          <img
                            src={data.attachment}
                            alt="post"
                            className="img-responsive post-image"
                          />
                          <div className="post-container">
                            <img
                              src={profile}
                              alt={data.firstName}
                              className="profile-photo-md pull-left"
                            />
                            <div className="post-detail">
                              <div className="user-info">
                                <h5>
                                  <NavLink
                                    to="#"
                                    className="profile-link"
                                    style={{textTransform:"capitalize" }}
                                  >
                                    {data.firstName} {data.lastName}
                                  </NavLink>
                                  {/* <span className="following">Add Friend</span> */}
                                </h5>
                                <p className="text-muted">{data.firstName} posted an image</p>
                              </div>
                              <div className="reaction">
                                <p className="btn text-green">
                                  <i className="icon ion-thumbsup"></i>
                                  57
                                </p>
                                <p className="btn text-red">
                                  <i className="fa fa-thumbs-down"></i>
                                  32
                                </p>
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
                              {/* {data.postComments.map((commentData) => {
                                return (
                                  <Fragment key={nanoid()}>
                                    <div className="post-comment">
                                      <img
                                        src={commentData.commentPic}
                                        alt={commentData.commentor}
                                        className="profile-photo-sm"
                                      />
                                      <p>
                                        <NavLink
                                          to={commentData.profileLink}
                                          className="profile-link"
                                        >
                                          {commentData.commentor}
                                        </NavLink>
                                        {commentData.comment}
                                      </p>
                                    </div>
                                  </Fragment>
                                );
                              })} */}
                              <div className="post-comment">
                                <img
                                  src={student.student.profilePicture}
                                  alt="user"
                                  className="profile-photo-sm"
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Post a comment"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--Popup End--> */}
                </div>
              </Col>
                ): null}
                
              </Fragment>
            );
          })}
        </Row>
      </div>
    </>
  );
};
export default NewsFeedUserImages;
