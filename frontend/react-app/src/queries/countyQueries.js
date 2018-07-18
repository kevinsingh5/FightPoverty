import { backendAPI }  from '../config.js'
import axios from 'axios';



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

/*

export async function getCounties(sort,stateFilters,scoreFilter, pageNumber){
	var link="";
	var response;
	const numStateFilters = stateFilters.length
	console.log("scorefilter is" + scoreFilter);
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
	console.log(link);
	
	response = await axios.get(link);

	return response.data;


}
*/