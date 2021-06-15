import React from "react"
import loadable from '@loadable/component'
import { Route,Redirect } from 'react-router-dom'; 
// import Cookies from 'universal-cookie';
const Header = loadable(() => import('../../components/LayoutComponent/PostActionHeader'))
const PostAction = ({children}) => {
    return (
        <>
          <Header/>
            <main>
                {children}
            </main>
        </>
    )
}
const studentLayoutRoute = ({isAuth,component: Component, ...rest}) => {  
//   const cookies = new Cookies();
//   const kitchencookie = new Cookies();
//   const secondaryEmailFoodUserCookies = new Cookies();
//   const secondaryEmailKitchenUserCookies = new Cookies();
//   const food_user = new Cookies();
//   const affiliated_kitchen = new Cookies();
//   cookies.remove("fooduser");
//   food_user.remove("fooduserdetails")
//   secondaryEmailKitchenUserCookies.remove("kitchenUserSecondaryEmail")
//   secondaryEmailFoodUserCookies.remove("foodUserSecondaryEmail")
//   kitchencookie.remove("kitchenuser"); 
//   affiliated_kitchen.remove("affiliatedKitchen");
//   localStorage.clear();
isAuth=localStorage.getItem('studentSignup');
  
    return ( 
      <> 
      <Route {...rest} render={matchProps => (  
        isAuth ? (
        <PostAction >  
            <Component {...matchProps} />  
        </PostAction>
        ) : <Redirect to={{pathname:"/register", state:{from:matchProps.location}}}/>
      )} />  
      </>
    )  
  };  

export default studentLayoutRoute;