import React from 'react';
import {Card, Col, Row} from "react-bootstrap"
import {Pips} from './pips.component';

export function Attributes() {
    return (
        <Row>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Physical</Card.Header>
                    <Pips/>
                    <Pips/>
                    <Pips/>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Social</Card.Header>
                    <Pips/>
                    <Pips/>
                    <Pips/>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '100%' }}>
                <Card.Header>Mental</Card.Header>
                    <Pips/>
                    <Pips/>
                    <Pips/>
                </Card>
            </Col>
        </Row>
    )
}