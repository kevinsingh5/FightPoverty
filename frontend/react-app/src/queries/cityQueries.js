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



export async function getCities(
	searchTerm, 
	sort, 
	stateFilters, 
	pageNumber, 
	results_per_page
){
	var link = backendAPI + 'api/city?results_per_page=' + results_per_page + '&page=' + (pageNumber || 1) ; // 1 if no pageNumber provided
	var response;


	if (!!searchTerm || sort !== "none" || stateFilters.length > 0) {
		link += "&q={"

		// Determine all filters
		if (!!searchTerm || stateFilters.length > 0) {
			link += `"filters":[`
			

			// ADD SEARCH TERM
			if (!!searchTerm) {
				link += `{"name":"name","op":"like","val":"%${searchTerm}%"}`
			}

			// ADD STATE FILTER
			if (stateFilters.length > 0) {
				if (!!searchTerm) {
					link += ","
				}

				link += `{"or":[`

				stateFilters.forEach((stateFilter, i) => {
					i > 0 ? link += `,` : ''					
					link += `{"name":"state","op":"eq","val":"${stateFilter}"}`				
				})		
				
				link += `]}`
			}

/*
			// ADD SCORE FILTER
			if (!!scoreFilter) {
				if ((!!searchTerm && stateFilters.length === 0) || stateFilters.length > 0) {
					link += ","
				}

				link += `{"name":"fight_poverty_score","op":"ge","val":"${scoreFilter}"}`
			}
		*/

			// Done with filters
			link += `]`
			

			if (sort !== "none") {
				link += `,`
			}
		}
				

		if (sort !== "none") {
			link += `"order_by":[{"field":`
			
			if (sort === "AZ") {
				link += `"name","direction":"asc"`
			} else if (sort === "ZA") {
				link += `"name","direction":"desc"`
			}

			// Finished with sort param
			link += `}]`				
		}

		// Finished with query filter string
		link += "}"
	}
	console.log(link);
	try{
		response = await axios.get(link);
	}
	catch(err){
	 	response = {data:{objects:[], num_results:0}};

	}

	return response.data;

}

