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

export async function getMoreCharities (pageNumber) {
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
export async function getSpecificCharity (charity) {
  const response = await axios.get(backendAPI+ 'api/charity?q={"filters":[{"name":"name","op":"eq","val":"' + charity + '"}]}');
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

export async function generalCharitySearch (txt, pageNumber) {
  	const response = await axios.get(backendAPI+ 'api/charity?q={"filters":[{"name":"name","op":"like","val":' +  '"%' + txt + '%"' +  '}]}&page=' + pageNumber +  '&results_per_page=3');
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

export async function sortCharitiesAZ (txt, pageNumber) {
  	const response = await axios.get(backendAPI+ 'api/charity?q={"order_by":[{"field":"name","direction":"asc"}]}');
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




