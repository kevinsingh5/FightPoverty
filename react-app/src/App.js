import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js';
import CharityInstance from './charityInstance.js';


class App extends Component {
  render() {
    return(
      <div>
      <NavBar />
      <div class="bg-light">
      <CharityInstance />
      </div>
      </div>
      
    );
  
  }
}

export default App;
