import React, { Component } from 'react';
import { generalCharitySearch } from '../../queries/charityQueries';
import { generalCitySearch} from '../../queries/cityQueries';
import { generalCountySearch} from '../../queries/countyQueries';

import Pagination from "react-js-pagination";
import CharityCard from '../CharityModel/CharityCard.js';
import CountyCard from '../CountyModel/CountyCard.js';
import CityCard from '../CityModel/CityCard.js';





class GeneralSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesActivePage: 1,
      countiesActivePage: 1,
      charitiesActivePage: 1,
      charities: [],
      counties: [],
      cities: []
    };
    this.handleCharitiesPageChange = this.handleCharitiesPageChange.bind(this);
    this.handleCitiesPageChange = this.handleCitiesPageChange.bind(this);
    this.handleCountiesPageChange = this.handleCountiesPageChange.bind(this);
  }
 

  async componentWillMount () {
    window.scrollTo(0,0);

    await this.setState({ charities: this.props.charities, counties: this.props.counties, cities: this.props.cities })
  }

  async handleCharitiesPageChange(pageNumber) {
    const newCharities = await generalCharitySearch(this.props.searchTerm, pageNumber);
    this.setState({charitiesActivePage: pageNumber, charities: newCharities.objects});

  }

  async handleCitiesPageChange(pageNumber) {
    const newCities = await generalCitySearch(this.props.searchTerm, pageNumber);
    this.setState({citiesActivePage: pageNumber, cities: newCities.objects});

  }

  async handleCountiesPageChange(pageNumber) {
    const newCounties = await generalCountySearch(this.props.searchTerm, pageNumber);
    this.setState({countiesActivePage: pageNumber, counties: newCounties.objects});

  }



  render() {
    const {
        searchTerm,
        totalNumCities,
        totalNumCounties,
        totalNumCharities,        
    } = this.props

    const {
        charities,
        cities,
        counties
    } = this.state

    return (
      <div>
                      <div className="album py-5 bg-light">




                                      <div className="container">
                                      <h1 align= "center"> Charity Results </h1>
                                      <div className="row">


                                      {charities.map((dynamicCharity, i) => <CharityCard 
                                      key = {i} charityInfo = {dynamicCharity} search = {searchTerm}/>)} 
                                      </div>
                                      </div>

                                      </div>

                                      <div>
                                      <Pagination 
                                      pageRangeDisplayed={5}
                                      activePage={this.state.charitiesActivePage}
                                      activeLinkClass = "active"
                                      itemsCountPerPage={9}
                                      totalItemsCount={totalNumCharities}
                                      onChange={this.handleCharitiesPageChange}
                                      />
                                      </div>



                                      <div className="container">
                                      <h1 align= "center"> City Results </h1>

                                      <div className="row">
                                      {cities.map((dynamicCity, i) => <CityCard
                                      key = {i} cityInfo = {dynamicCity} search = {searchTerm}/>)}

                                      </div>
                                     
                                      </div>
                                      <div>
                                      <Pagination
                                      pageRangeDisplayed={5}
                                      activePage={this.state.citiesActivePage}
                                      activeLinkClass = "active"
                                      itemsCountPerPage={9}
                                      totalItemsCount={totalNumCities}
                                      onChange={this.handleCitiesPageChange}
                                      />
                                      </div>

                                        

                                        <div className="container">
                                        <h1 align= "center" > County Results </h1>
                                        <div className="row">
                                        {counties.map((dynamicCounty, i) => <CountyCard
                                        key = {i} countyInfo = {dynamicCounty} search = {searchTerm} />)}
                                        </div>
                                        </div>

                                        
                                        <div>
                                        <Pagination
                                        pageRangeDisplayed={5}
                                        activePage={this.state.countiesActivePage}
                                        activeLinkClass = "active"
                                        itemsCountPerPage={9}
                                        totalItemsCount={totalNumCounties}
                                        onChange={this.handleCountiesPageChange}
                                        />

                                            </div>

                                        


                  


    </div>

    );

  }
}

export default GeneralSearchResults;   