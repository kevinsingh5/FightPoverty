import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CharityCard extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
  <div className="col-md-4">
                    <div className="card mb-4 box-shadow ">
                        <Link to={'/charities/'+ this.props.charityInfo.name} style = {{textDecoration:'none', color:'black'}}>

                        <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="https://portalbuzzuserfiles.s3.amazonaws.com/ou-19745/userfiles/images/logos/food%20bank.png"/>
                          <div className="card-body">

                          <h2 className="card-title">{this.props.charityInfo.name}</h2>
                           </div>
                        </Link>
          </div>
          </div>
   
  );

  }
}

export default CharityCard;   