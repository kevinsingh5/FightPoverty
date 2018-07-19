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
