//General
import {useState,useEffect} from "react"
import {  Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./components/ScrollToTop";
//CSS
import "./css/bootstrap.min.css";
import "./css/style.css";
import "./css/ionicons.min.css";
import "./css/font-awesome.min.css";
// import "./css/jquery.scrollbar.css"
// import "./css/jquery.mCustomScrollbar.css"
// import "./css/emoji.css"

//Pages
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import EditProfile from "./pages/EditProfile";
import EditProfileInterest from "./pages/EditProfileInterest";
import EditProfilePassword from "./pages/EditProfilePassword";
import EditProfileSettings from "./pages/EditProfileSettings";
import EditProfileWork from "./pages/EditProfileWork";
import Timeline from "./pages/Timeline";
import TimelineAbout from "./pages/TimelineAbout";
import TimelineAlbum from "./pages/TimelineAlbum";
import TimelineFriends from "./pages/TimelineFriends";
import NewsFeed from "./pages/NewsFeed";
import NewsFeedPeople from "./pages/NewsFeedPeople";
import NewsFeedFriends from "./pages/NewsFeedFriends";
import NewsFeedMedia from "./pages/NewsFeedMedia";
import NewsFeedImages from "./pages/NewsFeedImages";
import NewsFeedMessages from "./pages/NewsFeedMessages";
import StudentEmailVerification from "./pages/StudentEmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
//Routes
import HomeLayout from "./pages/Routes/HomeLayout"
import StudentLayout from "./pages/Routes/StudentLayout"
import RegistrationLayout from "./pages/Routes/RegistrationLayout"
import PostActionLayout from "./pages/Routes/PostActionLayout"
import ForgotPasswordModal from "./components/Verification/ForgotPasswordModal";
function App() {
  const [isUser,setIsUser] = useState(localStorage.getItem('studentAuth')) //for dashboard
  const [isAuth,setIsAuth] = useState(isUser);

  const [isUserSignup,setIsUserSignup] = useState(localStorage.getItem('studentSignup')) //for student signup
  const [isUserAuth,setIsUserAuth] = useState(isUserSignup)
  useEffect(()=>{
    if(isUser){
      setIsAuth(true)
    }
    else{
      setIsAuth(false)
    }
  },[isUser])
  useEffect(()=>{
    if(isUserSignup){
      setIsAuth(true)
    }
    else{
      setIsAuth(false)
    }
  },[isUserSignup])

  return (
    <>
    <ScrollToTop/>
    <Switch>
      <HomeLayout exact path="/" component={Home}/>
      <HomeLayout exact path="/contact" component={Contact} />
      <HomeLayout exact path="/faq" component={FAQ}/>

      <RegistrationLayout exact path="/register" component={()=><UserRegistration isAuth={setIsAuth(true)} isStudentAuth={setIsUserAuth(true)}/>} />
      <RegistrationLayout exact path="/forgot-password-form" component={()=><ForgotPasswordModal isStudentAuth={setIsUserAuth(true)}/>} />

      <PostActionLayout exact path="/student-email-verification/:studentID" component={()=><StudentEmailVerification/>} />
      <PostActionLayout exact path="/forgot-password/:forgotEmail" component={()=><ForgotPassword/>} />

      <StudentLayout isAuth={isAuth} exact path="/edit-profile" component={EditProfile}/>
      <StudentLayout isAuth={isAuth} exact path="/edit-profile-interests" component={EditProfileInterest}/>
      <StudentLayout isAuth={isAuth} exact path="/edit-profile-password" component={EditProfilePassword}/>
      <StudentLayout isAuth={isAuth} exact path="/edit-profile-settings" component={EditProfileSettings}/>
      <StudentLayout isAuth={isAuth} exact path="/edit-profile-work" component={EditProfileWork}/>

      <StudentLayout isAuth={isAuth} exact path="/timeline" component={Timeline}/>
      <StudentLayout isAuth={isAuth} exact path="/timeline-about" component={TimelineAbout}/>
      <StudentLayout isAuth={isAuth} exact path="/timeline-album" component={TimelineAlbum}/>
      <StudentLayout isAuth={isAuth} exact path="/timeline-friends" component={TimelineFriends}/>

      <StudentLayout isAuth={isAuth} exact path="/newsfeed" component={NewsFeed}/>
      <StudentLayout isAuth={isAuth} exact path="/newsfeed-people-nearby" component={NewsFeedPeople}/>
      <StudentLayout isAuth={isAuth} exact path="/newsfeed-friends" component={NewsFeedFriends}/>
      <StudentLayout isAuth={isAuth} exact path="/newsfeed-videos" component={NewsFeedMedia}/>
      <StudentLayout isAuth={isAuth} exact path="/newsfeed-images" component={NewsFeedImages}/>
      <StudentLayout isAuth={isAuth} exact path="/newsfeed-messages" component={NewsFeedMessages}/>
      <StudentLayout isAuth={isAuth} component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
