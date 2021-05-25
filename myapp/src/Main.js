import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PollPage from './pages/PollPage';
import BrowsePage from './pages/BrowsePage';
import CreatePollPage from './pages/CreatePollPage';


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path="/poll/:pollid" component={PollPage} /> 
      <Route exact path="/browse/:filter?" component={BrowsePage} /> 
      <Route exact path="/create" component={CreatePollPage} /> 

    </Switch>
  );
}


export default withRouter(Main);