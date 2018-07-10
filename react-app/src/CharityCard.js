import React, { Component } from 'react';

class ModelCard extends Component {
  render(){
  return(
  <div class="col-md-4">
              <div class="card mb-4 box-shadow ">
                <a href="Charities/txfoodbank.html" style="text-decoration: none">

                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="https://portalbuzzuserfiles.s3.amazonaws.com/ou-19745/userfiles/images/logos/food%20bank.png" />
                <div class="card-body">
             
                  <h2 class="card-title" id= "crdTitle"></h2>
                </div>
              </a>
          </div>
   </div>
  );
  }
}

export default ModelCard;