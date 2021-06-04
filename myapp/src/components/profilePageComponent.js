import React, {Component, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import ProfileRecent from "../components/profileRecentComponent.js";
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { Grid, Image } from 'semantic-ui-react'


function Profile(props) {

    var userID = props.userID;
    console.log(userID);
	const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();
	const [info, setInfo] = useState(0);


    const [email, setEmail] = useState('temp');

    
    if (isAuthenticated && !userID && user && email !== user.email) {
        console.log("set email?", user.email)
        setEmail(user.email);
    }

    if (userID && userID !== email) {
        setEmail(userID);
    }



        
    (async() => {
    while(!isAuthenticated) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));
	})();


    useEffect(() => {
        fetch( `/api/getUser/${email}`)
        .then((res) => res.json())
        .then((data) => {
            setInfo(data);
        })
        .catch((error) => console.log(error));
    }, [email]);


	return (
      <div>
            <Grid celled>
                <Grid.Row>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <h3>Name: {info['name']}</h3>
                    <h5>Email: {info['email']} </h5>
                    <h5>Role: {info['role']} </h5>
                </Grid.Column>
                </Grid.Row>



                <Grid.Row>
                    <Grid.Column width={3}>
                        <h3>Recent Voting History</h3>
                    </Grid.Column>
                    <Grid.Column width = {5}>
                        <ProfileRecent id = "vote" email = {email}/>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <h3>Recent Creation History</h3>
                    </Grid.Column>
                    <Grid.Column width = {5}>
                        <ProfileRecent id = "creation"  email = {email}/>
                    </Grid.Column>

                </Grid.Row>

            </Grid>


      </div>
    );
}



export default Profile;
