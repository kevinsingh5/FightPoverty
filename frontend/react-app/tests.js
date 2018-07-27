const assert = require('assert');
import {getCounties, getSpecificCounty} from './src/queries/countyQueries'
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
let NINE_RESULTS = 9;
let HUNDRED_RESULTS = 100;
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



describe('Alphabetical Sorting Tests',
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

describe('Numerical Sorting Tests',
    function () {

        it('Counties can be sorted by poverty percentage high to low',
            async function () {
                const counties = await getCounties(ALL_RESULTS, HIGHLOW_SORT, ALL_STATES, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                const poorest_county = counties.objects[0].county_poverty_percentage;
                for(let i = 1; i < HUNDRED_RESULTS; i++){
                    let county_to_compare = counties.objects[i].county_poverty_percentage
                    if(poorest_county < county_to_compare){
                        isFiltered = false;
                    }
                }
                assert.equal(isFiltered,true);});


       

          it('Charities can be sorted by FightPoverty Score high to low',
            async function () {
                const charities = await getCharities(ALL_RESULTS, HIGHLOW_SORT, ALL_STATES, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                const best_charity = charities.objects[0].fight_poverty_score;
                for(let i = 1; i < HUNDRED_RESULTS; i++){
                    let charity_to_compare = charities.objects[i].fight_poverty_score;
                    if(best_charity < charity_to_compare){
                        isFiltered = false;
                    }
                }


                assert.equal(isFiltered,true);});


           it('Counties can be sorted by poverty percentage low to high',
            async function () {
                const counties = await getCounties(ALL_RESULTS, LOWHIGH_SORT, ALL_STATES, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                const poorest_county = counties.objects[0].county_poverty_percentage;
                for(let i = 1; i < HUNDRED_RESULTS; i++){
                    let county_to_compare = counties.objects[i].county_poverty_percentage
                    if(poorest_county > county_to_compare){
                        isFiltered = false;
                    }
                }
                assert.equal(isFiltered,true);});


       

          it('Charities can be sorted by FightPoverty Score low to high',
            async function () {
                const charities = await getCharities(ALL_RESULTS, LOWHIGH_SORT, ALL_STATES, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                const worst_charity = charities.objects[0].fight_poverty_score;
                for(let i = 1; i < HUNDRED_RESULTS; i++){
                    let charity_to_compare = charities.objects[i].fight_poverty_score;
                    if(worst_charity > charity_to_compare){
                        isFiltered = false;
                    }
                }


                assert.equal(isFiltered,true);});
         
});




describe('Filtering Tests',
    function () {
        it('Counties can be filtered by poverty percentage',
            async function () {
                //filters counties that have poverty percent between 18-21
                const percent_filter = 21;
                const counties = await getCounties(ALL_RESULTS, NO_SORT, ALL_STATES, percent_filter, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                for(let i = 0; i < counties.objects.length; i++){
                    let county_to_check = counties.objects[i].county_poverty_percentage;
                    if(county_to_check < 18 || county_to_check > 21){
                        isFiltered= false;
                    }
                }
                assert.equal(isFiltered,true);});

        it('Counties can be filtered by state',
            async function () {
                const state_filter = ["Texas"];
                const counties = await getCounties(ALL_RESULTS, NO_SORT, state_filter, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                for(let i = 0; i < counties.objects.length;i++){
                    let county_to_check = counties.objects[i].state;
                    if(county_to_check != "Texas"){
                        isFiltered= false;
                    }
                }
                assert.equal(isFiltered,true);});

         it('Cities can be filtered by state',
            async function () {
                const state_filter = ["Texas"];
                const cities = await getCities(ALL_RESULTS, NO_SORT, state_filter, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                for(let i = 0; i < cities.objects.length;i++){
                    let city_to_check = cities.objects[i].state;
                    if(city_to_check != "Texas"){
                        isFiltered= false;
                    }
                }
                assert.equal(isFiltered,true);});

          it('Charities can be filtered by FightPoverty Score',
            async function () {
                //gives charities with score greater than 95
                const score_filter = 95;
                const charities = await getCharities(ALL_RESULTS, NO_SORT, ALL_STATES, score_filter, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                for(let i = 0; i< charities.objects.length; i++){
                    let charity_to_check = charities.objects[i].fight_poverty_score;
                    if(charity_to_check < 95){
                        isFiltered = false;
                    }
                }
                assert.equal(isFiltered,true);});

          it('Charities can be filtered by state',
            async function () {
                const state_filter = ["Texas"];
                const charities = await getCharities(ALL_RESULTS, NO_SORT, state_filter, ALL_RESULTS, page_num, HUNDRED_RESULTS);
                let isFiltered = true;
                for(let i = 0; i <charities.objects.length; i++){
                    let charityState = charities.objects[0].city.state;
                    if(charityState != "Texas"){
                        isFiltered = false;
                    }
                }
                
                assert.equal(isFiltered,true);});
});

