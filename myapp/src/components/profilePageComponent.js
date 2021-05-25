import React, {Component, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import ProfileRecent from "../components/profileRecentComponent.js";

function Profile() {
	const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();
	const [info, setInfo] = useState(0);
    if (isAuthenticated)
        var email = user.email;
    else
        var email = "temp";
        
    (async() => {
    while(!isAuthenticated) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));
	})();

    const fetcher = url => fetch(url).then(res => res.json())

    const { data } = useSWR(
        `/api/getUser/${email}`,
        fetcher
        );
    if(info == 0 && data !== undefined){
        setInfo(data);
    }

	return (
      <div className="container">
          <div class="card">
          <div class="card-header">Name: {info['name']}</div></div>
          <div class="card">
          <div class="card-header">Email: {info['email']}</div></div>
          <div class="card">
          <div class="card-header">Role: {info['role']}</div>
          <div class="card">
          <div class="card-header">Recent Polls</div>
          <div className="container">
          <ProfileRecent />
        </div>
      </div>
        </div>
      </div>
    );
}



export default Profile;