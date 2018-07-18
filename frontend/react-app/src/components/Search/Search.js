import React, { Component } from 'react';
import { getCharities, getNumOfCharities,generalCharitySearch } from '../../queries/charityQueries';
import { getCities,  getNumOfCities, generalCitySearch} from '../../queries/cityQueries';
import { getCounties, getNumOfCounties, generalCountySearch} from '../../queries/countyQueries';

import Pagination from "react-js-pagination";
import CharityCard from '../CharityModel/CharityCard.js';
import CountyCard from '../CountyModel/CountyCard.js';
import CityCard from '../CityModel/CityCard.js';






class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      citiesActivePage: 1,
      countiesActivePage: 1,
      charitiesActivePage:1,
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
 
   async updateTerm(){
    var newKeyword = document.getElementById("keywords").value;
    //setState is slow
    await this.setState({searchTerm: newKeyword, searched:true});

    const charityResponse = await generalCharitySearch(this.state.searchTerm, 1);
    const charities = charityResponse.objects;
    const numOfCharities = charityResponse.num_results;
    const cityResponse = await generalCitySearch(this.state.searchTerm,1);
    const cities = cityResponse.objects; 
    const numOfCities = cityResponse.num_results;
    const countyResponse = await generalCountySearch(this.state.searchTerm,1)
    const counties = countyResponse.objects;
    const numOfCounties = countyResponse.num_results;

    this.setState({ charities: charities, totalNumCharities: numOfCharities, cities: cities, totalNumCities: numOfCities, counties:counties, totalNumCounties:numOfCounties });

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
    const hasSearched = this.state.searched;
    const keywords = this.state.searchTerm;
    let searchPrompt;
    if(hasSearched){
        searchPrompt = <h1 className="jumbotron-heading"> Showing results for "{keywords}" </h1>
    }
    else{
      searchPrompt = <h1 className="jumbotron-heading"> Search </h1>
    }
    let charityPrompt;
    if(this.state.charities.length == 0  && hasSearched){
        charityPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No charity results found </p> </div>
    }
    else{
      charityPrompt = <div className="row"> {this.state.charities.map((dynamicCharity, i) => <CharityCard 
                                      key = {i} charityInfo = {dynamicCharity} search = {this.state.searchTerm}/>)}  </div>
    }
    let cityPrompt;
    if(this.state.cities.length == 0  && hasSearched){
      cityPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No city results found </p> </div>
    }
    else{
      cityPrompt = <div className="row"> {this.state.cities.map((dynamicCity, i) => <CityCard 
                                      key = {i} cityInfo = {dynamicCity} search = {this.state.searchTerm}/>)}  </div>
    }
    let countyPrompt;
    if(this.state.counties.length == 0 && hasSearched){
        countyPrompt = <div className="row" style= {{justifyContent: "center"}}> <p> No county results found </p> </div>
    }
    else{
      countyPrompt = <div className="row"> {this.state.counties.map((dynamicCounty, i) => <CountyCard 
                                        key = {i} countyInfo = {dynamicCounty} search = {this.state.searchTerm} />)}  </div>
    }



    return (
      <div>
                    <section className="jumbotron text-center">
                    <div className="container">
                       {searchPrompt}
                      <p> Look up anything in our database </p>
                       <form className="form-inline mt-2 mt-md-0" action="fightpoverty.online/home" method="GET" style  = {{justifyContent: "center"}}>
            <input className="form-control mr-sm-2" type="text" id = "keywords" placeholder="Enter keywords" aria-label="Search" />
            <button className=" btn-outline-success my-2 my-sm-0" type="button" onClick = {this.updateTerm}> Search</button>
            </form>
                    
                    </div>
                  </section>

                    {hasSearched ? 

                      <div className="album py-5 bg-light">



                          
                                      <div className="container">
                                      <h1 align= "center"> Charity Results </h1>
                                      {charityPrompt}
                                      </div>


                                      <div>
                                      <Pagination 
                                      pageRangeDisplayed={5}
                                      activePage={this.state.charitiesActivePage}
                                      activeLinkClass = "active"
                                      itemsCountPerPage={9}
                                      totalItemsCount={this.state.totalNumCharities}
                                      onChange={this.handleCharitiesPageChange}
                                      />
                                      </div>



                                      <div className="container">
                                      <h1 align= "center"> City Results </h1>

                                      {cityPrompt}
                                     
                                      </div>
                                      <div>
                                      <Pagination
                                      pageRangeDisplayed={5}
                                      activePage={this.state.citiesActivePage}
                                      activeLinkClass = "active"
                                      itemsCountPerPage={9}
                                      totalItemsCount={this.state.totalNumCities}
                                      onChange={this.handleCitiesPageChange}
                                      />
                                      </div>

                                        

                                        <div className="container">
                                        <h1 align= "center" > County Results </h1>
                                        {countyPrompt}
                                        </div>

                                        
                                        <div>
                                        <Pagination
                                        pageRangeDisplayed={5}
                                        activePage={this.state.countiesActivePage}
                                        activeLinkClass = "active"
                                        itemsCountPerPage={9}
                                        totalItemsCount={this.state.totalNumCounties}
                                        onChange={this.handleCountiesPageChange}
                                        />
                                 </div>


                       </div> : null}

                                        


                  


    </div>

    );

  }
}

export default Search;   