const assert = require('assert');
import { getCounties, getSpecificCounty, getMoreCounties} from './src/queries/countyQueries'
import {getCities, getSpecificCity, getMoreCities} from './src/queries/cityQueries'
import {getCharities, getSpecificCharity, getMoreCharities} from './src/queries/charityQueries'


/** to test, run '$ mocha --compilers js:babel-core/register tests.js' */


describe('Number of page items',
   function () {
         it('Counties = 9',
            async function () {
                const counties =  await getCounties();
                assert.equal(counties.length , 9);});

       it('Cities = 9',
            async function () {
                const cities =  await getCities();
                assert.equal(cities.length, 9);});

         it('Charities = 9',
            async function () {
                const charities =  await getCharities();
                assert.equal(charities.length, 9);})  });  


describe('Check if getSpecific returns correct instance',
    function () {
        it('getSpecificCounty',
            async function () {
                const county = await getSpecificCounty("Hillsborough County")
                assert.equal(county[0].name, "Hillsborough County");});

        it('getSpecificCity',
            async function () {
                const city = await getSpecificCity("Springfield")
                assert.equal(city[0].name, "Springfield");});

         it('getSpecificCharity',
            async function () {
                const charity = await getSpecificCharity("The Greater Boston Food Bank")
                assert.equal(charity[0].name, "The Greater Boston Food Bank");}); });

describe('Check getMore functions returns',
      function () {
        it('getMoreCounties',
            async function () {
                const counties = await getMoreCounties(10)
                assert.equal(counties.length, 9);});

        it('getMoreCities',
            async function () {
                const cities = await getMoreCities(10)
                assert.equal(cities.length, 9);});
         it('getMoreCharities',
            async function () {
                const charities = await getMoreCharities(10)
                assert.equal(charities.length, 9);}) });