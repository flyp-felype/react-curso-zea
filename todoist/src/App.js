import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodolist from './Components/CreateTodolist';
import ToList from './Components/ToList';
import {  Row, Col } from 'react-materialize';

class App extends Component {
  render() {
    return (
    <Row>
        <CreateTodolist />
        <ToList />
     </Row>
    );
  }
}

export default App;
