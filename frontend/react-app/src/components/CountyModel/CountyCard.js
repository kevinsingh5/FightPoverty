import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { countyImages } from '../../images/county_images'
var Highlight = require('react-highlighter');


class CountyCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isHovering:false
    }
      this.handleMouseHover = this.handleMouseHover.bind(this);

  }
  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }


  render() {
    let img_src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Usa_counties_large.svg/580px-Usa_counties_large.svg.png"
    if (!!countyImages && !!countyImages[this.props.countyInfo.name]) {
      img_src = countyImages[this.props.countyInfo.name]
    }


    return (
    <div className="col-md-4" style={{justifyContent:"center"}}>
          <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>

              <div className="card mb-4 box-shadow">
                 <Link to={{pathname: '/counties/'+ this.props.countyInfo.name, state: this.props.countyInfo}} style = {{color:'black', textDecoration:"none"}}>

                <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src={img_src}  />
                <div className="card-body">
                  <h2 className="card-title"><Highlight search= {this.props.search}>{this.props.countyInfo.name}</Highlight></h2>
      {this.state.isHovering &&
          <div className="card-attributes">
            <ul>
              <li>State: {this.props.countyInfo.state}</li>
              <li>Poverty Percentage: {this.props.countyInfo.county_poverty_percentage}%</li>
              <li>Poverty Population: {this.props.countyInfo.county_poverty_population}</li>
              <li>FightPoverty Multiplier: {this.props.countyInfo.fight_poverty_multiplier}</li>
            </ul>
          </div>
        }
                </div>
              </Link>
            </div>
          </div>
          </div>
   
  );

  }
}

export default CountyCard;   