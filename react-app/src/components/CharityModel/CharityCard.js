import React, { Component } from 'react';

class CharityCard extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
  <div className="col-md-4">
                    <div className="card mb-4 box-shadow ">
                       <a href="#">

                        <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="https://portalbuzzuserfiles.s3.amazonaws.com/ou-19745/userfiles/images/logos/food%20bank.png"/>
                          <div className="card-body">

                          <h2 className="card-title">Central Texas Food Bank</h2>
                           </div>
                        </a>
          </div>
          </div>
   
  );

  }
}

export default CharityCard;   