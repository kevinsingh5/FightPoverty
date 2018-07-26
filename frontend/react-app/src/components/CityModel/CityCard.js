import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Highlight from 'react-highlighter';
import { cityImages } from '../../images/city_images'


class CityCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      isHovering:false,
      onCountiesPage: false
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
    let img_src = "http://www.foodieoncampus.com/wp-content/uploads/2016/01/City-Skyline.jpg"
    if (!!cityImages && !!cityImages[this.props.cityInfo.name]) {
      img_src = cityImages[this.props.cityInfo.name]
    }
    var parts = window.location.href.split('/');
    var link = parts.pop();
    var check = parts.pop();
    if(check == "counties"){
      this.state.onCountiesPage = true;
    }


    return (
  
   <div className="col-md-4" style={{justifyContent:"center"}}>
    <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
        
      <div className="card mb-4 box-shadow">
        
        <Link to={{pathname: '/cities/'+ this.props.cityInfo.name, state: this.props.cityInfo}} style = {{color:'black', textDecoration:"none"}}>
         <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src={img_src}  />
         <div className="card-body">
                                                                              
<h2 className="card-title"><Highlight search= {this.props.search}>{this.props.cityInfo.name}</Highlight></h2> 

{this.state.isHovering &&
          <div className="card-attributes">
            <ul>
              <li>State: {this.props.cityInfo.state}</li>
              {!this.state.onCountiesPage &&
              <li>County: {this.props.cityInfo.county.name}</li>
              }
              {this.state.onCountiesPage && 
              <li> County: {this.props.countyName}</li>}
              <li>Average CharityNavigator Score: {this.props.cityInfo.average_charity_navigator_score}</li>
              <li>Average FightPoverty Score: {this.props.cityInfo.average_fight_poverty_score}</li>


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

export default CityCard;   