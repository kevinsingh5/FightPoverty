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

export async function getCharities(sort,stateFilters,scoreFilter, pageNumber){
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