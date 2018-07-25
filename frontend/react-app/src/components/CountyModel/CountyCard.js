import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { countyImages } from '../../images/county_images'
var Highlight = require('react-highlighter');


class CountyCard extends Component {
  


  render() {
    let img_src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Usa_counties_large.svg/580px-Usa_counties_large.svg.png"
    if (!!countyImages && !!countyImages[this.props.countyInfo.name]) {
      img_src = countyImages[this.props.countyInfo.name]
    }


    return (
    <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                 <Link to={{pathname: '/counties/'+ this.props.countyInfo.name, state: this.props.countyInfo}} style = {{color:'black', textDecoration:"none"}}>

                <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src={img_src}  />
                <div className="card-body">
                  <h2 className="card-title"><Highlight search= {this.props.search}>{this.props.countyInfo.name}</Highlight></h2>
                </div>
              </Link>
            </div>
          </div>
   
  );

  }
}

export default CountyCard;   