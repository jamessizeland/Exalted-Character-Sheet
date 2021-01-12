import React from 'react';
import {Card, ListGroup, Row, Col, Container} from "react-bootstrap";
import { Backgrounds } from "./backgrounds.component";
import { Virtues } from "./virtues.component";
import {Anima} from './Anima.component';

export function Head({ name, caste, motivation}) {
    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{ width: '100%',  height: '100%'}}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Name: {name}</ListGroup.Item>
                            <ListGroup.Item>Caste: {caste}</ListGroup.Item>
                            <ListGroup.Item>Motivation: {motivation}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Anima/>
                </Col>
            </Row>
        </Container>
            
    )
}