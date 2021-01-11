import React from 'react';
import {Card, ListGroup, Row, Col, Container} from "react-bootstrap";
import {Pips} from './pips.component';

export function Anima() {
    return (
        <Card style={{height: '100%'}}>
            <ListGroup variant="flush">
                <ListGroup.Item>Resonance <Pips/></ListGroup.Item>
                <ListGroup.Item>Willpower <Pips/></ListGroup.Item>
                <ListGroup.Item>Essence <Pips/></ListGroup.Item>
            </ListGroup>
        </Card>
    )
}