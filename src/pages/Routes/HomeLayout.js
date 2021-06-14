import React from "react"
import loadable from '@loadable/component'
import { Route } from 'react-router-dom'; 
 import Cookies from 'universal-cookie';
const Header = loadable(() => import('../../components/LayoutComponent/Header'))
const Footer = loadable(() => import('../../components/LayoutComponent/Footer'))


const HomeLayout = ({children}) => {
    return (
        <>
          <Header/>
            <main>
                {children}
            </main>
          <Footer/>
        </>
    )
}
const homeLayoutRoute = ({component: Component, ...rest}) => {  
   const cookies = new Cookies();
//   const kitchencookie = new Cookies();
//   const secondaryEmailFoodUserCookies = new Cookies();
//   const secondaryEmailKitchenUserCookies = new Cookies();
//   const food_user = new Cookies();
//   const affiliated_kitchen = new Cookies();
   cookies.remove("student");
//   food_user.remove("fooduserdetails")
//   secondaryEmailKitchenUserCookies.remove("kitchenUserSecondaryEmail")
//   secondaryEmailFoodUserCookies.remove("foodUserSecondaryEmail")
//   kitchencookie.remove("kitchenuser"); 
//   affiliated_kitchen.remove("affiliatedKitchen");
  localStorage.clear();


    return ( 
      <> 
      <Route {...rest} render={matchProps => (  
        <HomeLayout>  
            <Component {...matchProps} />  
        </HomeLayout>  
      )} />  
      </>
    )  
  };  

export default homeLayoutRoute;