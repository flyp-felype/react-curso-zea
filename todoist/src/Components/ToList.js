import React, { Component } from 'react';

import {  Row, Col, CollectionItem, Collection } from 'react-materialize';
export default class ToList extends Component {
    render() {
        return (
            <Row>
                <Col s={12}>
                    <Collection header='Tasks'>
                        <CollectionItem>Task</CollectionItem>
                    </Collection>
                </Col>
            </Row>
        )
    }
}