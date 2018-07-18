import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import Carousel from './components/Carousel/Carousel';
import { Switch, Route } from 'react-router-dom'
import CharityModel from './components/CharityModel/charityModel'
import CityModel from './components/CityModel/cityModel'
import CountyModel from './components/CountyModel/countyModel'
import CityInstance from './components/Cities/cityInstance'
import CountyInstance from './components/Counties/countyInstance'
import CharityInstance from './components/Charities/charityInstance'
import About from './components/About/About'
import Search from './components/Search/Search'





class App extends Component {
  render() {
    return(
      <div>
        <NavBar />
        <div className="bg-light">
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/home' component={Carousel} />
            <Route exact path='/search' component={Search} />
            <Route path='/search/:searchterm' component={Search} />
            <Route exact path='/cities' component={CityModel} />
            <Route path='/cities/:name' component={CityInstance} />
            <Route exact path='/counties' component={CountyModel} />
            <Route path='/counties/:name' component={CountyInstance}/>
            <Route exact path='/charities' component={CharityModel} />
            <Route path='/charities/:name' component={CharityInstance}/>

            <Route exact path='/about' component={About} />
          </Switch>
        </div>
        
        <footer class="container">
          


          <p class="float-right"><a href="#">Back to top</a></p>
          <p>&copy; FightPoverty.online. &middot;</p>
        </footer>

      </div>
      
    );
  
  }
}

export default App;
