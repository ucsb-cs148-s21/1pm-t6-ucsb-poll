import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';

import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PollPage from './components/PollPage';


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/profile' component={ProfilePage}></Route>  
      <Route exact path="/poll/:pollid" component={PollPage} /> 
      
    </Switch>
  );
}


export default withRouter(Main);