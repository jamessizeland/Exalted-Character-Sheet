import React from 'react';
import {Card, Col, Row} from "react-bootstrap"
import {Pips} from './pips.component';

export function Abilities() {
    return (
        <Row>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Dusk</Card.Header>
                    <Pips total={5} checked= {3}/>
                    <Pips total={5} checked= {2}/>
                    <Pips total={5} checked= {5}/>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Midnight</Card.Header>
                    <Pips total={5} checked= {2}/>
                    <Pips total={5} checked= {3}/>
                    <Pips total={5} checked= {1}/>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Daybreak</Card.Header>
                    <Pips total={5} checked= {1}/>
                    <Pips total={5} checked= {1}/>
                    <Pips total={5} checked= {1}/>
                </Card>
            </Col>
        </Row>
    )
}