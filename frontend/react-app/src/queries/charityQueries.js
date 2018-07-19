import { backendAPI }  from '../config.js'
import axios from 'axios';




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





export async function getCharities(
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
				link += `{"name":"name","op":"like","val":"%25${searchTerm}%25"}`
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
	try{
	response = await axios.get(link);
	}
	catch(err){
	 	response = {data:{objects:[], num_results:0}};

	}


	return response.data;

}