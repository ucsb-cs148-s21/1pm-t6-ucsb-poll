//https://react-bootstrap.github.io/components/navbar/

import React, {Component, useState} from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import AuthenticationButton from "./components/AuthenticationButton";
//import { useAuth0 } from "@auth0/auth0-react";


export function NavigationBar ({isAdmin, isMember, adminPages}) {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
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
                        <Nav.Link href="#home">Home</Nav.Link>
                        {isMember && 
                            <Nav.Link href="#profile">Profile</Nav.Link>
                        }
                        {isAdmin &&
                            <NavDropdown title="Admin">
                            {adminPages.map(item => (
                                <NavDropdown.Item key={item.name} href={item.link}> {item.name} </NavDropdown.Item>
                            ))}
                            </NavDropdown>
                        }
                        <NavDropdown title="Polls" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Browse</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Create a poll</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Form inline>
                        <FormControl type="text" placeholder="Search for a poll" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
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
    // const { getAccessTokenSilently: getToken } = useAuth0();
    // const { isAuthenticated, loginWithRedirect, logout} = useAutho0();
    // const { data: roleInfo } = useSWR(
    //   ["/api/myRole", getToken],
    //   fetchWithToken
    // );
    // const isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";
    // const isMember = roleInfo && roleInfo.role.toLowerCase() === "member";



    /* 
        return (
            <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            </div>
        );
    */
    const adminPages = [
        {link:"/admin", name:"Maintain Admins",},
        {link:"/admin/polls", name:"Moderate Polls",},
      ];
    return (<NavigationBar isAdmin={true} isMember={true} adminPages = {adminPages}/>);

}


export default AppNavigationBar;
