import { backendAPI }  from '../config.js'
import axios from 'axios';

/*

export async function getCounties () {
  const response = await axios.get(backendAPI+ 'api/county')
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
export async function getNumOfCounties () {
  const response = await axios.get(backendAPI+ 'api/county')
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

export async function getMoreCounties (pageNumber) {
  const response = await axios.get(backendAPI+ 'api/county?page=' + pageNumber);
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

export async function getSpecificCounty (county) {
  const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"eq","val":"' + county + '"}]}');
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

export async function generalCountySearch (text, pageNumber){
  	  const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"like","val":' + '"%' + text + '%"' + "}]}"+ "&" + "page=" + pageNumber + '&results_per_page=3');
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



export async function getCounties(sort,stateFilters, percentFilt, pageNumber){
	var link="";
	var response;
	var percentFilter = parseInt(percentFilt)


	console.log("percentFilter is" + percentFilter);
	if(sort == "none"){
		if(stateFilters == ""){
			link = backendAPI + 'api/county?page=' + pageNumber;
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += '&q={"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}]}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += '&q={"filters":[{"name":"county_poverty_percentage","op":"le","val":' + "9" + '}]}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += '&q={"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + "21" + '}]}';
			}

		}
		else{
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" + '{"filters":[{"name":"state","op":"eq","val":"' + stateFilters +  '"}';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',{"name":"county_poverty_percentage","op":"le","val":9}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":21}';
			}

			link+= "]}"
		}

			
		
		
		
	}

	else if(sort == "AZ"){
		if(stateFilters == ""){
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}]';
			if(!isNaN(percentFilter && percentFilter > 9 && percentFilter < 24)){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"le","val":9}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":21}]';
			}
			link += '}';
		}

		
		else {
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"asc"}],'+ '"filters":[{"name":"state","op":"eq","val":"' + stateFilters +  '"}';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}'
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',{"name":"county_poverty_percentage","op":"le","val":9}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":21}';
			}
			link += ']}';
		}


	

	}

	else if(sort == "ZA"){
		if(stateFilters == ""){
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}]';			
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"le","val":9}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":21}]';
			}
			link += '}';
		}
		else{
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"name","direction":"desc"}],'+ '"filters":[{"name":"state","op":"eq","val":"' + stateFilters +  '"}';			
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}'
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',{"name":"county_poverty_percentage","op":"le","val":9}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":21}';
			}
			link += ']}';
		}


	}

	else if(sort == "0100"){
		if(stateFilters == ""){
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"county_poverty_percentage","direction":"asc"}]';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"le","val":9}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":21}]';
			}
			link += '}';
		}
		else{
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"county_poverty_percentage","direction":"asc"}],'+ '"filters":[{"name":"state","op":"eq","val":"' + stateFilters +  '"}';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}'
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',{"name":"county_poverty_percentage","op":"le","val":9}';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":21}';
			}
			link += ']}';
		}




	}

	else if(sort == "1000"){
		if(stateFilters == ""){
			console.log("check")
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"county_poverty_percentage","direction":"desc"}]';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"le","val":9}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',"filters":[{"name":"county_poverty_percentage","op":"ge","val":21}]';
			}
			link += '}';

		}
		else{
			link = backendAPI + 'api/county?page=' + pageNumber+ "&q=" +'{"order_by":[{"field":"county_poverty_percentage","direction":"desc"}],'+ '"filters":[{"name":"state","op":"eq","val":"' + stateFilters +  '"}';
			if(!isNaN(percentFilter) && percentFilter > 9 && percentFilter < 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":' + (percentFilter-3) + '}' + ',{"name":"county_poverty_percentage","op":"le","val":' + percentFilter + '}'
			}
			else if(!isNaN(percentFilter) && percentFilter == 9){
				link += ',{"name":"county_poverty_percentage","op":"le","val":9}]';
			}
			else if(!isNaN(percentFilter) && percentFilter == 24){
				link += ',{"name":"county_poverty_percentage","op":"ge","val":21}]';
			}
			link += ']}';

		}

	}
	console.log(link);
	
	response = await axios.get(link);

	return response.data;


}

export async function countySearch (text, pageNumber){
	const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"like","val":' + '"%' + text + '%"' + "}]}"+ "&" + "page=" + pageNumber + '&results_per_page=9');
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

export async function getCounties2(
	searchTerm, 
	sort, 
	stateFilters, 
	percentFilter, 
	pageNumber, 
	results_per_page
){
	var link = backendAPI + 'api/county?results_per_page=' + results_per_page + '&page=' + (pageNumber || 1) ; // 1 if no pageNumber provided
	var response;
	var percentFilt = parseInt(percentFilter);

	if (!!searchTerm || sort !== "none" || stateFilters.length > 0 || !!percentFilter) {
		link += "&q={"

		// Determine all filters
		if (!!searchTerm || stateFilters.length > 0 || !!percentFilter) {
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


			// ADD PERCENT FILTER
			if (!!percentFilter) {
				if ((!!searchTerm && stateFilters.length === 0) || stateFilters.length > 0) {
					link += ","
				}

				link += `{"name":"county_poverty_percentage","op":"ge","val":"${percentFilt-3}"},{"name":"county_poverty_percentage","op":"le","val":"${percentFilt}"}`
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
				link += `"county_poverty_percentage","direction":"asc"`
			} else if (sort === "1000") {
				link += `"county_poverty_percentage","direction":"desc"`
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
