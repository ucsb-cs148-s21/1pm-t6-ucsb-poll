import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PollPage from './pages/PollPage';


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path="/poll/:pollid" component={PollPage} /> 
      <Route exact path="/browse/:filter" component={PollPage} /> 
      <Route exact path="/create" component={PollPage} /> 

    </Switch>
  );
}


export default withRouter(Main);