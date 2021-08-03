import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

    return (
        <Container fluid className='footer'>
            <Row className='footer-section'>
                <Col>
                    <p>© 2021 | Translator</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
