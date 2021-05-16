import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/profile' component={ProfilePage}></Route>
      {/* <Route path="/poll/:pollID" component={PollPage} /> */} 
    </Switch>
  );
}

export default Main;