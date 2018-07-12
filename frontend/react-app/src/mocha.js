const assert = require('assert');
import axios from 'axios'

async function getCounties () {
  const response = await axios.get(backendAPI+ 'api/county')
      // .then(function (response) {
      //   console.log(response);
      //   return response.data.objects;
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      // console.log("hello");
      return response.data.objects;
      

describe('Number of Counties',
    function () {
        it('test1',
            function () {
                assert.equal(getCounties().name, 1);});

        it('test2',
            function () {
                assert.equal(cycle_length( 5), 6);});

        it('test3',
            function () {
                assert.equal(cycle_length(10), 7);});});

