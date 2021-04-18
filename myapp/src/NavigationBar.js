//https://react-bootstrap.github.io/components/navbar/

import React, {Component} from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import AuthenticationButton from "./components/AuthenticationButton";

export default class NavigationBar extends Component {

render() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Navigation Bar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <NavDropdown title="Polls" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Browse</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Create a poll</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
            <div className="navbar-nav ml-auto">
                <AuthenticationButton />
            </div>
        </Navbar.Collapse>
        </Navbar>
  );

}
}