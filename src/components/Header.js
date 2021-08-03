import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {

    return (
        <Container fluid className='header'>
            <Row>
                <Col>
                    <p className='header-title'>English-Spanish</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
