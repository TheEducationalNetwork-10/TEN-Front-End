import React,{useState, useEffect,Fragment} from "react";
import { nanoid } from "nanoid";
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
  const Album = [
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-1",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-2",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-3",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-4",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-5",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-6",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-7",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-8",
    },
    {
      img: "http://placehold.it/1000x1000",
      modalTargetClass: "photo-9",
    },
  ];
  return (
    <>
      <ul class="album-photos">
        {posts.map((data,index) => {
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
        })}
      </ul>
    </>
  );
};
export default ProfileAlbum;
