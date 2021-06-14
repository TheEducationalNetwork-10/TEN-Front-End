import React from "react"
import loadable from '@loadable/component'
import { Route } from 'react-router-dom'; 
 import Cookies from 'universal-cookie';
const Header = loadable(() => import('../../components/LayoutComponent/Header'))


const RegistrationLayout = ({children}) => {
    return (
        <>
          <Header/>
            <main>
                {children}
            </main>
        </>
    )
}
const registrationLayoutRoute = ({component: Component, ...rest}) => {  
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
        <RegistrationLayout>  
            <Component {...matchProps} />  
        </RegistrationLayout>  
      )} />  
      </>
    )  
  };  

export default registrationLayoutRoute;