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


// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll(r) {
  let imageMap = {}

  // EXTREMELY INEFFICIENT O(9 * O(N^2))
  r.keys().map((imageTag, i) => {
    const recordName = imageTag.substring(2, imageTag.length - 4)

    imageMap[recordName] = r.keys().map(r)[i]
  })

  return imageMap
}






class App extends Component {
  render() {
    const charityImages = importAll(require.context('./images/charities/', false, /\.(png|jpe?g|svg)$/));
    const cityImages = importAll(require.context('./images/cities/', false, /\.(png|jpe?g|svg)$/));
    const countyImages = importAll(require.context('./images/counties/', false, /\.(png|jpe?g|svg)$/));

    return(
      <div>
        <NavBar />
        <div className="bg-light">
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/home' component={Carousel} />

            <Route exact path='/search' render={()=> {
              return <Search charityImages={charityImages} countyImages={countyImages} cityImages={cityImages} />
              }}
            />
            <Route path='/search/:searchterm' render={()=> {
              return <Search charityImages={charityImages} countyImages={countyImages} cityImages={cityImages} />
              }}
            />

            <Route exact path='/cities' render={()=><CityModel images={cityImages}/>} />
            <Route path='/cities/:name' component={CityInstance} />

            <Route exact path='/counties' render={()=><CountyModel images={countyImages}/>} />
            <Route path='/counties/:name' component={CountyInstance}/>

            <Route exact path='/charities' render={()=><CharityModel images={charityImages}/>} />
            <Route path='/charities/:name' component={CharityInstance}/>

            <Route exact path='/about' component={About} />
          </Switch>
        </div>
        
        <footer class="container">
          About Us
          
          <br />
          <br />

          Our goal is to allow users to browse a database that ranks charities aiming to fight poverty in cities around the United States. Easily find charities and organizations in your city or county you would like to help out! Our intended users are those who want to help others in need and make an impact not only in their community, but those across the U.S.
          <br />
          <br />
          <p class="float-right"><a href="#">Back to top</a></p>
          <p>&copy; FightPoverty.online. &middot;</p>
        </footer>

      </div>
      
    );
  
  }
}

export default App;
