import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CityCard extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
  
   <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <Link to={'/cities/'+ this.props.cityInfo.name} style = {{textDecoration:'none', color:'black'}}>
         <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="http://paperlief.com/images/austin-texas-skyline-at-night-wallpaper-4.jpg" />
         <div className="card-body">
            <h2 className="card-title">{this.props.cityInfo.name}</h2>
         </div>
         </Link>
      </div>
   </div>

   
  );

  }
}

export default CityCard;   