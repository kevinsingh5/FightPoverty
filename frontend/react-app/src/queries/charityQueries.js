import { backendAPI }  from '../config.js'
import axios from 'axios';



export async function getCharities () {
  const response = await axios.get(backendAPI+ 'api/charity')
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

export async function getNumOfCharities () {
  const response = await axios.get(backendAPI+ 'api/charity')
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

export async function getCharity (pageNumber) {
  const response = await axios.get(backendAPI+ 'api/charity?page=' + pageNumber);
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