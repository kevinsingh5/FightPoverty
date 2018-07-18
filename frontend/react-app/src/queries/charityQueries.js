import { backendAPI }  from '../config.js'
import axios from 'axios';

/*

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
*/
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

export async function getCharities(sort,stateFilters, pageNumber){
	let response;
	const numStateFilters = stateFilters.length
	console.log(sort);
	console.log(numStateFilters);
	if(sort == "none"){
		if(numStateFilters == 0){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber);

		}
		else if(numStateFilters == 1){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" + '{"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"' + stateFilters[0] +  '"}}]}');
		}
		
		else{
			for(let i = 0 ; i< numStateFilters; i++){

			}
		}
		
	}

	else if(sort == "AZ"){
		if(numStateFilters == 0){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}]}');

		}

		
		else if(numStateFilters == 1){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters[0] + '"}}]}');
		}
	
/*
		else{
			for(let i = 0 ; i< numStateFilters; i++){

			}
		}
*/
	}

	else if(sort == "ZA"){
		if(numStateFilters == 0){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}]}');
		}
		else if(numStateFilters == 1){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters[0] + '"}}]}');

		}
/*
		else{
			for(let i = 0 ; i< numStateFilters; i++){

			}
		}
*/

	}

	else if(sort == "0100"){
		if(numStateFilters == 0){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}]}');
		}
		else if(numStateFilters == 1){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters[0] + '"}}]}');
		}
/*
		else{
			for(let i = 0 ; i< numStateFilters; i++){

			}
		}
		*/


	}

	else if(sort == "1000"){
		if(numStateFilters == 0){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}]}');

		}
		else if(numStateFilters == 1){
			response = await axios.get(backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters[0] + '"}}]}');

		}
/*
		else{
			for(let i = 0 ; i< numStateFilters; i++){

			}
		}

*/

	}
	

	return response.data;

}