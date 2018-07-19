import { backendAPI }  from '../config.js'
import axios from 'axios';




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
/*

export async function getCities(sort,stateFilters,pageNumber){
	var link="";
	var response;
	
	if(sort == "none"){
		if(stateFilters == ""){
			link = bac

		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" + '{"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"' + stateFilters +  '"}}';
			
		}
			
		
		
		
	}

	else if(sort == "AZ"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}]';
			
		}

		
		else {
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			
		}


	

	}

	else if(sort == "ZA"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}]';
			
		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			
		}


	}

	else if(sort == "0100"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}]';
			
		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			
		}




	}

	else if(sort == "1000"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}]';
			
			

		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			

		}

	}
	console.log(link);
	
	response = await axios.get(link);

	return response.data;

}
*/
