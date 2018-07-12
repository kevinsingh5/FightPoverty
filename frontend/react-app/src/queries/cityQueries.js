import { countiesResponse } from '../static/cities.js'
import { backendAPI }  from '../config.js'
import axios from 'axios';



export async function getCities () {
  const response = await axios.get(backendAPI+ 'api/city')
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data.objects;
	  
}
export async function getNumOfCities () {
  const response = await axios.get(backendAPI+ 'api/city')
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data.num_results;
	  
}

export async function getCity (pageNumber) {
  const response = await axios.get(backendAPI+ 'api/city?page=' + pageNumber)
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data.objects;
}