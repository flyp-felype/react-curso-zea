import React, { Component } from 'react';
import { Button, Row, Col, Input } from 'react-materialize';


export default class CreateTodolist extends Component {

    createTask = () => {
        
    }
    render() {
        return (
            <Row>
                <Col s={12} m={8}>
                <h3>Criar Tarefa</h3>
                    <Col s={12} m={10} className='grid-example'>
                        <Input placeholder="Tarefas" s={12} m={6} label="Nome da tarefa" />
                        <Input placeholder="Tarefas" s={12} m={6}  type='date'  label="Nome da tarefa" />
                    </Col>
                    <Col s={12} m={2}>
                        <Button floating large className='red' waves='light' icon='add' onClick={this.createTask} />
                    </Col>
                </Col>
            </Row>
        )
    }
}