import React from 'react';
import './Footer.css';
import { Card } from 'react-bootstrap';

const Footer = () => {
    return (
        <Card bg="primary" expand="lg">
            <Card.Body className="text-center">
                <Card.Title>V I S U A L I Z A</Card.Title>
                <Card.Text>
                    Dayana Armas Alonso
                </Card.Text>
            </Card.Body>
        </Card>
    );
  };
  
  export default Footer;