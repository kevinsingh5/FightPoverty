import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Highlight from 'react-highlighter';


class CityCard extends Component {
  

  render() {
    let img_src = "http://www.foodieoncampus.com/wp-content/uploads/2016/01/City-Skyline.jpg"
    if (!!this.props.images && !!this.props.images[this.props.cityInfo.name]) {
      img_src = this.props.images[this.props.cityInfo.name]
    }


    return (
  
   <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        
        <Link to={{pathname: '/cities/'+ this.props.cityInfo.name, state: this.props.cityInfo}} style = {{color:'black', textDecoration:"none"}}>
         <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src={img_src}  />
         <div className="card-body">
                                                                              
<h2 className="card-title"><Highlight search= {this.props.search}>{this.props.cityInfo.name}</Highlight></h2> 
         </div>
         </Link>

      </div>
   </div>

   
  );

  }
}

export default CityCard;   