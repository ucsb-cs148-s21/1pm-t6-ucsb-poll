import React, {Component, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";

function ProfileRecent() {
	const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();
	const [info, setInfo] = useState([]);
  const [recent, setRecent] = useState([]);
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
        `/api/getUserVotingHistory/${email}`,
        fetcher
        );
    if(data !== undefined){
      if(data.length != info.length)
        setInfo(data);
      else
      {
        if(data[0].length != info[0].length)
          setInfo(data);
      }
    }

	return (
     <div>
     <div>
      {info[1] && info[1].map((item, index) => {
          return <div class="card">
          <div class="card-header"><a href={'/#/poll/\"' + info[0][index]+'\"'}>{item}</a></div></div>
        })}
    </div>
    </div>
    );
}



export default ProfileRecent;