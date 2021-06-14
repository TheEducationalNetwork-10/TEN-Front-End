import React from "react"
import {Container} from "react-bootstrap"
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo.png"
const PostActionHeader = () =>{

    return(
        <>
       
    {/* <div id="spinner-wrapper">
      <div className="spinner"></div>
    </div> */}

   
<header id="header">
      <nav className="navbar navbar-default navbar-fixed-top menu">
        <Container className="dBlock">

          
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to="#"><img src={Logo} alt="logo" /></NavLink>
          </div>

         
         
        </Container>
      </nav>
    </header>
   
    
        </>
    )
}
export default PostActionHeader;