import { backendAPI }  from '../config.js'
import axios from 'axios';


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

export async function charitySearch (txt, pageNumber) {
	const response = await axios.get(backendAPI+ 'api/charity?q={"filters":[{"name":"name","op":"like","val":' +  '"%' + txt + '%"' +  '}]}&page=' + pageNumber +  '&results_per_page=9');
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


export async function getCharities(sort, stateFilters, scoreFilter, pageNumber){
	var link = "";
	var response;
	
	if(sort == "none"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber;
			if(scoreFilter != ""){
				link += '&q={"filters":[{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}]}';
			}

		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" + '{"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"' + stateFilters +  '"}}';
			if(scoreFilter != ""){
				link += ',{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}';
			}
			link += ']}';
		}
			
		
		
		
	}

	else if(sort == "AZ"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}]';
			if(scoreFilter != ""){
				link += ',"filters":[{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter +  '}]';
			}
			link += '}';
		}

		
		else {
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			if(scoreFilter != ""){
				link += ',{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}';
			}
			link += ']}';
		}


	

	}

	else if(sort == "ZA"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}]';
			if(scoreFilter != ""){
				link += ',"filters":[{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter +  '}]';
			}
			link += '}';
		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			if(scoreFilter != ""){
				link += ',{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}';
			}
			link += ']}';
		}


	}

	else if(sort == "0100"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}]';
			if(scoreFilter != ""){
				link += ',"filters":[{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter +  '}]';
			}
			link += '}';
		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"asc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			if(scoreFilter != ""){
				link += ',{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}';
			}
			link += ']}';
		}




	}

	else if(sort == "1000"){
		if(stateFilters == ""){
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}]';
			if(scoreFilter != ""){
				link += ',"filters":[{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter +  '}]';
			}
			link += '}';

		}
		else{
			link = backendAPI + 'api/charity?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"fight_poverty_score","direction":"desc"}],'+ '"filters":[{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"'+ stateFilters + '"}}';
			if(scoreFilter != ""){
				link += ',{"name":"fight_poverty_score","op":"ge","val":' + scoreFilter + '}';
			}
			link += ']}';

		}

	}
	
	response = await axios.get(link);

	return response.data;

}


export async function getCharities2(
	searchTerm, 
	sort, 
	stateFilters, 
	scoreFilter, 
	pageNumber, 
	results_per_page
){
	var link = backendAPI + 'api/charity?results_per_page=' + results_per_page + '&page=' + (pageNumber || 1) ; // 1 if no pageNumber provided
	var response;


	if (!!searchTerm || sort !== "none" || stateFilters.length > 0 || !!scoreFilter) {
		link += "&q={"

		// Determine all filters
		if (!!searchTerm || stateFilters.length > 0 || !!scoreFilter) {
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
					link += `{"name":"city","op":"has","val":{"name":"state","op":"eq","val":"${stateFilter}"}}`				
				})		
				
				link += `]}`
			}


			// ADD SCORE FILTER
			if (!!scoreFilter) {
				if ((!!searchTerm && stateFilters.length === 0) || stateFilters.length > 0) {
					link += ","
				}

				link += `{"name":"fight_poverty_score","op":"ge","val":"${scoreFilter}"}`
			}
			

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
			} else if (sort === "0100") {
				link += `"fight_poverty_score","direction":"asc"`
			} else if (sort === "1000") {
				link += `"fight_poverty_score","direction":"desc"`
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