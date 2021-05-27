//https://react-bootstrap.github.io/components/navbar/
import React, {Component, useState, useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Alert } from 'react-bootstrap';
import AuthenticationButton from "./login/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { Link } from 'react-router';
import Searchfunc from "./Searchfunction.js"



export function NavigationBar ({isAdmin, isMember, adminPages}) {
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const addNewUser = async (event) => {
        const url = "/addNewUser";
        try {
            const result = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                }),
            });
            console.log(`result=${JSON.stringify(result)}`)
            return result;
        } catch (err) {
            console.log(`err=${err}`)
        }
    };
    
    const handleOnClick = async (e) => {
        e.preventDefault();
        const answer = await addNewUser(e);
    }


        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src="PollsLogo.png"
                        width= "75"
                        height="32"
                        className="d-inline-block align-top"
                        alt="Polls logo"
                    />
                </Navbar.Brand>                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {isMember && 
                            <Nav.Link href="/#/profile">Profile</Nav.Link>
                        }
                        
                        {isAdmin &&
                            <NavDropdown title="Admin">
                            {adminPages.map(item => (
                                <NavDropdown.Item key={item.name} href={item.link}> {item.name} </NavDropdown.Item>
                            ))}
                            </NavDropdown>
                        }
                        <NavDropdown title="Polls" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/#/browse/">Browse</NavDropdown.Item>
                            {isMember && <NavDropdown.Item href="/#/create">Create a poll</NavDropdown.Item>}
                        </NavDropdown>
                        <Form inline> 
                        </Form>

                        <Searchfunc /> 
                        
                        {/*<a href={"/#/"+window.pollid}>}
                        <Button variant="outline-success">Search</Button>
                        {</a>*/}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <div className="navbar-nav ml-auto">
                            <AuthenticationButton />
                        </div>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>
        );

    
}


function AppNavigationBar() {
    const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();

    if (isAuthenticated)
        var email = user.email;
    else
        var email = "temp";
        

    //
    // THIS WORKS
    //
    const fetcher = url => fetch(url).then(res => res.json())
    const { data } = useSWR(
        `/api/getUser/${email}`,
        fetcher
        );
    const isAdmin2 = data && data.role === "admin";


    const adminPages = [
        {link:"/admin", name:"Maintain Admins",},
        {link:"/admin/polls", name:"Moderate Polls",},
      ];


    return (<NavigationBar isAdmin={isAdmin2} isMember={isAuthenticated} adminPages = {adminPages}/>);

}


export default AppNavigationBar;



//one way
/*
    async function getUser() {
        try {
            let res = await fetch(`/api/getUser/${email}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    let currentuser = getUser();
    var role;
    var role2;
    //var isAdmin;
    currentuser.then(function(result) {
        console.log("result:", result);
        role = result.role;
        console.log("role1: ", role);

     })

*/


//another way

/*
    fetch(`/api/getUser/${email}`, {
        method: "GET",
        headers: {
             Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("real data: ", data);
        role2 = data.role;
        console.log("role2: ", role2);
        var isAdmin3 = role2 === "admin";
        console.log("isadmin3: ", isAdmin3);
        //if (isAdmin3)
                //setAdmin(true);

    });
*/