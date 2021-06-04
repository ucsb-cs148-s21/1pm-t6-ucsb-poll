import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PollPage from './pages/PollPage';
import BrowsePage from './pages/BrowsePage';
import CreatePollPage from './pages/CreatePollPage';
import ScrollToTop from './components/util/ScrollToTop';


const Main = () => {
  return (
    <div>
    <ScrollToTop/>
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/profile/:userid?' component={ProfilePage} />
      <Route exact path="/poll/:pollid" component={PollPage} /> 
      <Route exact path="/browse/:filter?" component={BrowsePage} /> 
      <Route exact path="/create" component={CreatePollPage} /> 

    </Switch>
    </div>
  );
}


export default withRouter(Main);