import React, { Component } from 'react';
import AutorBox from './components/Autor';
import Home from './components/Home';
import Livro from './components/Livro';
import './css/pure-min.css';
import './css/side-menu.css'
import {
 Switch, Route, Link
} from 'react-router-dom'

class App extends Component {

  constructor() {
    super();
    this.state = { lista: []};
  }  

  render() {
    return (
      <div className="App">
      <div id="layout">
      <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
      </a>
      <div id="menu">
          <div className="pure-menu">
          <a className="pure-menu-heading" >Company</a>
          <ul className="pure-menu-list">
              <li className="pure-menu-item">
              <Link to="/"  className="pure-menu-link">Home</Link ></li>
              <li  className="pure-menu-item">
              <Link  to="/autor"  className="pure-menu-link">Autor</Link >
              </li>
              <li className="pure-menu-item">
              <Link  to="/livro"  className="pure-menu-link">Livros</Link ></li>
          </ul>
          </div>
      </div>
      <div id="main">
      <div className="content" id="content">
            <main>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/autor' component={AutorBox}/>
              <Route path='/livro' component={Livro}/>
            </Switch>
          </main>
          </div>
                    </div>
                    </div>
                </div>   
    );
  }
}

export default App;
