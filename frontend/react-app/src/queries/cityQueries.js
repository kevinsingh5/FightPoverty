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

export async function getMoreCities (pageNumber) {
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

export async function getSpecificCity (city) {
  const response = await axios.get(backendAPI+ 'api/city?q={"filters":[{"name":"name","op":"eq","val":"' + city + '"}]}');
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


export async function generalCitySearch (text, pageNumber) {
  	  const response = await axios.get(backendAPI+ 'api/city?q={"filters":[{"name":"name","op":"like","val":' + '"%' + text + '%"' + "}]}&page=" + pageNumber + '&results_per_page=3');
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data;

}

export async function citySearch (text, pageNumber) {
	const response = await axios.get(backendAPI+ 'api/city?q={"filters":[{"name":"name","op":"like","val":' + '"%' + text + '%"' + "}]}&page=" + pageNumber + '&results_per_page=9');
  // .then(function (response) {
  //   console.log(response);
  //   return response.data.objects;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  // console.log("hello");
  return response.data;

}