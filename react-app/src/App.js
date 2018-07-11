import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import CharityInstance from './components/Charities/charityInstance';
import Carousel from './components/Carousel/Carousel';
import { Switch, Route } from 'react-router-dom'
import CharityModel from './components/CharityModel/charityModel'
import CityModel from './components/CityModel/cityModel'
import CountyModel from './components/CountyModel/countyModel'


class App extends Component {
  render() {
    return(
      <div>
        <NavBar />
        <div className="bg-light">
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/home' component={Carousel} />
            <Route exact path='/cities' component={CityModel} />
            <Route exact path='/counties' component={CountyModel} />
            <Route exact path='/charities' component={CharityModel} />
            <Route exact path='/about' component={null} />
          </Switch>
        </div>
      </div>
      
    );
  
  }
}

export default App;
