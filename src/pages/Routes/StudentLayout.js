import React from "react"
import loadable from '@loadable/component'
import { Route,Redirect } from 'react-router-dom'; 
// import Cookies from 'universal-cookie';
const Header = loadable(() => import('../../components/LayoutComponent/StudentHeader'))
const Footer = loadable(() => import('../../components/LayoutComponent/Footer'))


const StudentLayout = ({children}) => {
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
const studentLayoutRoute = ({isAuth,component: Component, ...rest}) => {  
  isAuth=localStorage.getItem('studentAuth');
  console.log(isAuth)


    return ( 
      <> 
      <Route {...rest} render={matchProps => (  
        isAuth ? (
        <StudentLayout >  
            <Component {...matchProps} />  
        </StudentLayout>
        ) : <Redirect to={{pathname:"/register", state:{from:matchProps.location}}}/>
      )} />  
      </>
    )  
  };  

export default studentLayoutRoute;