import React from 'react'
import Navbar from "react-bootstrap/es/Navbar";
import Nav from "react-bootstrap/es/Nav";

const Header = (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">{'Coiner'}</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="logout">Logout</Nav.Link>
        </Nav>
    </Navbar>
);

export default Header;