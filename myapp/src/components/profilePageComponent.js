import React, {Component, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import ProfileRecent from "../components/profileRecentComponent.js";
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { Grid, Image } from 'semantic-ui-react'


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
                    <Grid.Column width = {13}>
                        <ProfileRecent id = "vote" />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <h3>Recent Creation History</h3>
                    </Grid.Column>
                    <Grid.Column width = {13}>
                        <ProfileRecent id = "create" />
                    </Grid.Column>

                </Grid.Row>
            </Grid>


        {/* <Container>
            <Row>
                <Col>
                <img src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' alt="profils pic" />
                </Col>
                    <Col>
                        <h1>User Profile</h1>
                        <Form className="form">     
                <p>state message</p>
            <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={user && user.name}/>
            
            </Form.Group>
            <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={user && user.email} />
            
            </Form.Group>
                
            <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" name="profileImage" /> 
                {/* onChange={changeProfileImage} */}
                {/* </Form.Group> */}
            {/* <Button variant="primary" onClick={UpdateProfileHandler}>Update Profile</Button> */}
            {/* </Form>
            </Col> */}

        {/* </Row>
        </Container> */} 


        {/* <div className="container">
            <div class="card">
            <div class="card-header">Name: {info['name']}</div></div>
            <div class="card">
            <div class="card-header">Email: {info['email']}</div></div>
            <div class="card">
            <div class="card-header">Role: {info['role']}</div>
            <div class="card">
            <div class="card-header"><h4>Recent Polls</h4></div>
            <div className="container">
            <ProfileRecent />
            </div>
            </div>
                </div>
        </div> */}
      </div>
    );
}



export default Profile;
