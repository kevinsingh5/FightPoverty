import React, { Component } from 'react';
import { generalCharitySearch } from '../../queries/charityQueries';
import { generalCitySearch} from '../../queries/cityQueries';
import { generalCountySearch} from '../../queries/countyQueries';

import CharityCard from '../CharityModel/CharityCard.js';
import CountyCard from '../CountyModel/CountyCard.js';
import CityCard from '../CityModel/CityCard.js';
import GeneralSearchResults from './GeneralSearchResults';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      citiesActivePage: 1,
      countiesActivePage: 1,
      charitiesActivePage: 1,
      charities:[],
      cities:[],
      counties:[],
      totalNumCities: 0,
      totalNumCounties:0,
      totalNumCharities: 0,
      searched: false

    };
    this.handleCharitiesPageChange = this.handleCharitiesPageChange.bind(this);
    this.handleCitiesPageChange = this.handleCitiesPageChange.bind(this);
    this.handleCountiesPageChange = this.handleCountiesPageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchTerm: nextProps.searchTerm, searched: !!nextProps.searchTerm });  
  }
 

 async routeToSearchPage () {
  var newKeyword = document.getElementById("keywords").value;
  window.location.replace("/search/" + newKeyword)
 }

  async componentWillMount () {
    window.scrollTo(0,0);

    // get search term from pathname if general search and do the search
    const path = window.location.pathname
    if (path.includes("/search/") && path.length > "/search/".length) {
      let searchTerm = path.substring("/search/".length) 
      searchTerm = searchTerm.replace("%20", " ")

      await this.setState({searchTerm: searchTerm});

      const charityResponse = await generalCharitySearch(this.state.searchTerm, 1);
      const charities = charityResponse.objects;
      const numOfCharities = charityResponse.num_results;
      const cityResponse = await generalCitySearch(this.state.searchTerm,1);
      const cities = cityResponse.objects; 
      const numOfCities = cityResponse.num_results;
      const countyResponse = await generalCountySearch(this.state.searchTerm,1)
      const counties = countyResponse.objects;
      const numOfCounties = countyResponse.num_results;
  
      await this.setState({ 
        searched:true, 
        charities: charities, 
        totalNumCharities: numOfCharities, 
        cities: cities, 
        totalNumCities: numOfCities, 
        counties:counties, 
        totalNumCounties:numOfCounties 
      });

    }

  }

  async handleCharitiesPageChange(pageNumber) {
    const newCharities = await generalCharitySearch(this.state.searchTerm, pageNumber);
    this.setState({charitiesActivePage: pageNumber, charities: newCharities.objects});

  }

  async handleCitiesPageChange(pageNumber) {
    const newCities = await generalCitySearch(this.state.searchTerm, pageNumber);
    this.setState({citiesActivePage: pageNumber, cities: newCities.objects});

  }

  async handleCountiesPageChange(pageNumber) {
    const newCounties = await generalCountySearch(this.state.searchTerm, pageNumber);
    this.setState({countiesActivePage: pageNumber, counties: newCounties.objects});

  }



  render() {
    const updateTerm = this.props.updateTerm

    const thisIsCharitySearch = window.location.pathname.includes("charities")
    const thisIsCitySearch = window.location.pathname.includes("cities")
    const thisIsCountySearch = window.location.pathname.includes("counties")
    const thisIsGeneralSearch = !thisIsCharitySearch && !thisIsCitySearch && !thisIsCountySearch
    const thisIsSearchPage = window.location.pathname.includes("search")
    const needToRouteToSearchPage = !thisIsSearchPage && thisIsGeneralSearch

    const hasSearched = this.state.searched;
    const keywords = this.state.searchTerm;


    let searchPrompt;
    if(hasSearched){
        if (thisIsGeneralSearch && 
            (this.state.charities.length > 0 || 
             this.state.cities.length > 0 ||
             this.state.counties.length > 0)) {
          searchPrompt = `Showing results for "${keywords}"`
        } else if (thisIsGeneralSearch) {
          searchPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No results found </p> </div>
        }

        if (thisIsCharitySearch && this.props.charitiesFound) {
          searchPrompt = `Showing charities that match "${keywords}"`
        } else if (thisIsCharitySearch) {
          searchPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No charity results found </p> </div>
        }

        if (thisIsCitySearch && this.props.citiesFound) {
          searchPrompt = `Showing cities that match "${keywords}"`
        } else if (thisIsCitySearch) {
          searchPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No city results found </p> </div>
        }

        if (thisIsCountySearch && this.props.countiesFound) {
          searchPrompt = `Showing counties that match "${keywords}"`
        } else if (thisIsCountySearch) {
          searchPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No county results found </p> </div>
        }

    }


    return (
      <div>
                    
                    <div className="container" style={{ justifyContent: "center", textAlign: "center" }}>
                      {thisIsSearchPage && <div> <br /> <br /> <br /> </div>}
                    
                      {thisIsGeneralSearch && <p style={{ color: thisIsSearchPage ? "black" : "white" }}> Look up anything in our database </p>}

                       <form className="form-inline mt-2 mt-md-0" >
            <input className="form-control mr-sm-2" type="text" id = "keywords" placeholder="Enter keywords" aria-label="Search" />
            
            {needToRouteToSearchPage &&
              <button className=" btn-outline-success my-2 my-sm-0" type="button" onClick = {this.routeToSearchPage}> Search</button>
            }

            {!needToRouteToSearchPage && thisIsGeneralSearch &&
              <button className=" btn-outline-success my-2 my-sm-0" type="button" onClick = {this.routeToSearchPage}> Search</button>
            }

            {!thisIsGeneralSearch &&
              <button className=" btn-outline-success my-2 my-sm-0" type="button" onClick = {updateTerm}> Search</button>
            }

            </form>
            
            <div style={{ marginTop: !!searchPrompt ? "15px" : "0px" }}>
              {searchPrompt}  
            </div>          
                    
                    </div>
                 

            {thisIsGeneralSearch && this.state.searched && 
              <GeneralSearchResults 
                searchTerm={this.state.searchTerm}
                charities={this.state.charities}
                cities={this.state.cities}
                counties={this.state.counties}
                totalNumCities={this.state.totalNumCities}
                totalNumCounties={this.state.totalNumCounties}
                totalNumCharities={this.state.totalNumCharities}
                charityImages={this.props.charityImages}
                countyImages={this.props.countyImages}
                cityImages={this.props.cityImages}
              />
            }
   
    </div>

    );

  }
}

export default Search;   