import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css'
import MainMenu from './MainMenu/MainMenu';
import Login from './Login/Login';
import Articles from './Articles/Articles';
import Header from './Header/Header';
import Account from './Account/Account';
import Footer from './Footer/Footer'

//main structure project. Grid css
const AppContainer = () => {
  return (
    <div className={'site-wrapper'}>
      <div className={'site-wrapper-header'}>
        <Header />
      </div>
      <div className={'site-wrapper-nav '}>
        <MainMenu />
      </div>
      <div className={'site-wrapper-account '}>
        <Account />
      </div>
      <div className={'site-wrapper-feed'}>
        <Route path={'/login'} render={() => <Login />} />
        <Route path={'/articles'} render={() => <Articles />} />
      </div>
      <div className={'site-wrapper-secondMenu '}>
        Here will be second Menu
        {/* create component */}
      </div>
      <div className={'site-wrapper-footer'}>
        <Footer />
      </div>
    </div >
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  )
}
export default App;