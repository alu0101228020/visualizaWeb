import React from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Brand className="ms-4" href="/">
                <img
                src="/grafico-de-barras.png"
                width="32"
                height="32"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                hspace="20"
                />
                V I S U A L I Z A</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-4">
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
  
export default Header;