const assert = require('assert');
import { getCounties, getSpecificCounty} from './src/queries/countyQueries'
import {getCities, getSpecificCity} from './src/queries/cityQueries'
import {getCharities, getSpecificCharity} from './src/queries/charityQueries'


/** to test, run '$ mocha --compilers js:babel-core/register tests.js' */
let ALL_RESULTS= ''
let NO_SORT = "none"
let AZ_SORT = "AZ"
let ZA_SORT = "ZA"
let HIGHLOW_SORT= "1000"
let LOWHIGH_SORT= "0100"
let ALL_STATES = [];
let page_num = 1;
let NINE_RESULTS = 9
describe('Number of page items for model pages',
   function () {
         it('Counties = 9',
            async function () {
                const counties =  await getCounties(ALL_RESULTS, NO_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(counties.objects.length , 9);
            });

       it('Cities = 9',
            async function () {
                const cities =  await getCities(ALL_RESULTS, NO_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.equal(cities.objects.length , 9);
            })

         it('Charities = 9',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, NO_SORT, ALL_STATES, ALL_RESULTS,page_num, NINE_RESULTS);
                assert.equal(charities.objects.length , 9);
            }); 
     })


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
                assert.equal(charity[0].name, "The Greater Boston Food Bank");}); 
     });



describe('Alphabetical Sorting Checks',
    function () {
        it('Counties can be sorted A-Z',
            async function () {
                const counties = await getCounties(ALL_RESULTS, AZ_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(counties.objects[0].name.substring(0,1), "A");});

        it('Cities can sorted A-Z',
            async function () {
                const cities =  await getCities(ALL_RESULTS, AZ_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.equal(cities.objects[0].name.substring(0,1), "A");});

         it('Charities can be sorted A-Z',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, AZ_SORT, ALL_STATES,ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(charities.objects[0].name.substring(0,1), "A");});

          it('Counties can be sorted Z-A',
            async function () {
                const counties = await getCounties(ALL_RESULTS, ZA_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.notEqual(counties.objects[0].name.substring(0,1), "A");});

        it('Cities can sorted Z-A',
            async function () {
                const cities =  await getCities(ALL_RESULTS, ZA_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.notEqual(cities.objects[0].name.substring(0,1), "A");});

         it('Charities can be sorted Z-A',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, ZA_SORT, ALL_STATES,ALL_RESULTS, page_num, NINE_RESULTS);
                assert.notEqual(charities.objects[0].name.substring(0,1), "A");}); 
     });
/*
describe('Alphabetical Sorting Checks',
    function () {
        it('Counties can be sorted A-Z',
            async function () {
                const counties = await getCounties(ALL_RESULTS, AZ_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(counties.objects[0].name.substring(0,1), "A");});

        it('Cities can sorted A-Z',
            async function () {
                const cities =  await getCities(ALL_RESULTS, AZ_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.equal(cities.objects[0].name.substring(0,1), "A");});

         it('Charities can be sorted A-Z',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, AZ_SORT, ALL_STATES,ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(charities.objects[0].name.substring(0,1), "A");});

          it('Counties can be sorted Z-A',
            async function () {
                const counties = await getCounties(ALL_RESULTS, ZA_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.notEqual(counties.objects[0].name.substring(0,1), "A");});

        it('Cities can sorted Z-A',
            async function () {
                const cities =  await getCities(ALL_RESULTS, ZA_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.notEqual(cities.objects[0].name.substring(0,1), "A");});

         it('Charities can be sorted Z-A',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, ZA_SORT, ALL_STATES,ALL_RESULTS, page_num, NINE_RESULTS);
                assert.notEqual(charities.objects[0].name.substring(0,1), "A");}); 
     });

describe('Filtering Checks',
    function () {
        it('Counties can be filtered by poverty percentage',
            async function () {
                const counties = await getCounties(ALL_RESULTS, HIGHLOW_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(counties.objects[0].name.substring(0,1), "A");});

        it('Cities can sorted A-Z',
            async function () {
                const cities =  await getCities(ALL_RESULTS, AZ_SORT, ALL_STATES, page_num, NINE_RESULTS);
                assert.equal(cities.objects[0].name.substring(0,1), "A");});

         it('Charities can be sorted A-Z',
            async function () {
                const charities =  await getCharities(ALL_RESULTS, AZ_SORT, ALL_STATES,ALL_RESULTS, page_num, NINE_RESULTS);
                assert.equal(charities.objects[0].name.substring(0,1), "A");});

          it('Counties can be sorted Z-A',
            async function () {
                const counties = await getCounties(ALL_RESULTS, ZA_SORT, ALL_STATES, ALL_RESULTS, page_num, NINE_RESULTS);
                assert.notEqual(counties.objects[0].name.substring(0,1), "A");});
});
*/
