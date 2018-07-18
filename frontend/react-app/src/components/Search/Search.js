import React, { Component } from 'react';
import { getCharities, getNumOfCharities,generalCharitySearch } from '../../queries/charityQueries';
import { getCities,  getNumOfCities, generalCitySearch} from '../../queries/cityQueries';
import { getCounties, getNumOfCounties, generalCountySearch} from '../../queries/countyQueries';

import Pagination from "react-js-pagination";
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
    this.updateTerm = this.updateTerm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchTerm: nextProps.searchTerm, searched: !!nextProps.searchTerm });  
  }
 
   async updateTerm(){
    var newKeyword = document.getElementById("keywords").value;
    //setState is slow
    await this.setState({searchTerm: newKeyword});

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

      console.log()

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
    const parentThis = this.props.parentThis

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
        searchPrompt = <p> Showing results for "{keywords}" </p> 
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
              <button className=" btn-outline-success my-2 my-sm-0" type="button" onClick = {() => updateTerm(parentThis)}> Search</button>
            }

            </form>
                    {searchPrompt}
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
                    />
                  }
   
    </div>

    );

  }
}

export default Search;   