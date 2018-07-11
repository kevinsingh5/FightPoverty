import { countiesResponse } from '../static/counties.js'
import { backendAPI }  from '../config.js'
import axios from 'axios';



export const getCounties = () => {
   axios.get(backendAPI+ 'api/county')
  .then(function (response) {
    console.log(response);
    return response.data.objects;
  })
  .catch(function (error) {
    console.log(error);
  });
  
}