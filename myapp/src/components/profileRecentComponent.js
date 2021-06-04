import React, {Component, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { List } from 'semantic-ui-react'
import timeSince from './util/timeSince'
function ProfileRecent(props) {
	const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();
	const [info, setInfo] = useState([]);
  const [recent, setRecent] = useState([]);
  const [email, setEmail] = useState(props.email);


  if (email !== props.email) {
    setEmail(props.email);
  }
        
    (async() => {
    while(!isAuthenticated) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));
	})();

    const fetcher = url => fetch(url).then(res => res.json())

    const { data } = useSWR(
        `/api/getUserVotingHistory/${email}`,
        fetcher
        );
    if(data !== undefined && props.id === "vote"){
      if(data.length != info.length)
        setInfo(data);
      else
      {
        if(data[0].length != info[0].length)
          setInfo(data);
      }
    }

    const { data: data1, error: error1 } = useSWR(
      `/api/getUserCreationHistory/${email}`,
      fetcher
      );
  if(data1 !== undefined && props.id === "creation"){

    if(data1.length != info.length || !info ||  data1[0][0] !== info[0][0])
      setInfo(data1);
    else
    {
      if(data1[0].length != info[0].length )
        setInfo(data1);
    }
  }
  // console.log ("data1", data1);
  // console.log("info", info)

	return (

    <List divided relaxed>
      {info[0] && info[1].map((item, index) => {
          return (
            <List.Item href={'/#/poll/\"' + info[0][index]+'\"'} >
              {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
              <List.Content>
                <List.Header as='a'>{item}</List.Header>
                <List.Description as='a'>{info[2] && timeSince(new Date(info[2][index]))}</List.Description>
              </List.Content>
            </List.Item>
      )})}
  </List>


    );
}



export default ProfileRecent;