import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PollPage from './components/PollPage';
import PublicPage from './components/PublicPage';


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={PublicPage}></Route>
      <Route exact path='/home' component={HomePage}></Route>
      <Route exact path='/profile' component={ProfilePage}></Route>  
      <Route exact path="/poll/:pollid" component={PollPage} /> 
    </Switch>
  );
}

export default Main;