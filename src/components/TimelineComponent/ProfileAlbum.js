import React,{useState, useEffect,Fragment} from "react";
import { nanoid } from "nanoid";
import {Spinner} from "react-bootstrap"
import axiosConfig from "../../Config/axiosConfig";
const ProfileAlbum = () => {
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
      <ul class="album-photos">
        {posts.length > 0 ? posts.map((data,index) => {
          return (
            <Fragment key={nanoid()}>
               {data.attachment ? (
              <li >
               
                  <>
                  <div
                  className="img-wrapper"
                  data-toggle="modal"
                  data-target={`.photo-${index+1}`}
                >
                  <img src={data.attachment} alt={data.firstName} />
                </div>
                <div
                  className={`modal fade photo-${index+1}`}
                  tabindex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <img src={data.attachment} alt={data.firstName} />
                    </div>
                  </div>
                </div>
                </>
                
              </li>
              ): null}
                
            </Fragment>
          );
        }): (
          <div className="loading">
            <Spinner animation="border" variant="primary" />
            </div>
        )}
      </ul>
    </>
  );
};
export default ProfileAlbum;
