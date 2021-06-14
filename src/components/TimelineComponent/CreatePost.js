import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";
import sarah from "../../images/sarah.jpg";
import Cookies from "universal-cookie";
import axiosConfig from "../../Config/axiosConfig";
const CreatePost = () => {
  const cookies = new Cookies();
  let student = JSON.parse(localStorage.getItem("newStudent"))
  const [docForm, setDocForm] = useState([]);
  const [attachment, setFile] = useState("");
  const [create, setCreate] = useState({
    postBody: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState({
    error: "",
  });
  const postObj = {
    ...create,
    attachment,
  };
  function documentEvent(event) {
    event.preventDefault();
    let file_reader = new FileReader();
    let file = event.target.files[0];
    file_reader.onload = () => {
      setDocForm([...docForm, { uploaded_file: file_reader.result }]);
      setFile(file_reader.result);
    };
    file_reader.readAsDataURL(file);
  }
  const inputEvent = (e) => {
    const { name, value } = e.target;

    setCreate((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const createPost = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessages({
      error: "",
    });
    axiosConfig
      .post(`posts/create/${student.student._id}`, postObj)
      .then(function (response) {
        if (response.status === 200) {
          setIsLoading(false);
          console.log(response.data)
          setMessages({
            error: "",
          });
          setCreate({postBody:""})
        }
      })

      .catch((error) => {
        setMessages({
          error: error.response.data.message,
        });
        setIsLoading(false);
      });
  };
  return (
    <>
      <div class="create-post">
        <form onSubmit={createPost}>
          <Row>
            <Col md={7} sm={7}>
              <div class="form-group">
                <img src={student.student.profilePicture} alt="" class="profile-photo-md" />
                <textarea
                  name="postBody"
                  id="exampleTextarea"
                  cols="30"
                  rows="1"
                  class="form-control"
                  onChange={inputEvent}
                  value={create.postBody}
                  placeholder="Write what you wish"
                  required
                />
              </div>
            </Col>
            <Col md={5} sm={5}>
              <div class="tools">
                <ul class="publishing-tools list-inline">
                  <li>
                    <input
                      type="file"
                      className="file"
                      name="fileID_F"
                      onChange={documentEvent}
                      id={1}
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </li>
                  {/* <li>
                  <NavLink to="#">
                    <i class="ion-images"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
                    <i class="ion-ios-videocam"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#">
                    <i class="ion-map"></i>
                  </NavLink>
                </li> */}
                </ul>
                <button class="btn btn-primary pull-right" type="submit">
                  Publish
                </button>
              </div>
            </Col>
          </Row>
        </form>
        {messages.error ? <p className="error">{messages.error}</p> : null}
        {isLoading ? (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default CreatePost;
