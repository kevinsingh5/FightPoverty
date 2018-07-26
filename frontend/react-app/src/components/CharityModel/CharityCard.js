import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { charityImages } from '../../images/charity_images'
var Highlight = require('react-highlighter');


class CharityCard extends Component {
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
    
    let img_src = "https://static.makeuseof.com/wp-content/uploads/2016/01/best-sponsor-charity-670x335.jpg"
    if (!!charityImages && !!charityImages[this.props.charityInfo.name]) {
      img_src = charityImages[this.props.charityInfo.name]
    }


    return (
  <div className="col-md-4" style={{justifyContent:"center"}}>
              <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>


                    <div className="card mb-4 box-shadow ">

                       <Link to={{pathname: '/charities/'+ this.props.charityInfo.name, state: this.props.charityInfo}} style = {{color:'black', textDecoration: 'none'}}>

                        <img 
                          className="card-img-top" 
                          alt = "" 
                          data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" 
                          src={img_src}
                        />

                        

                          <div className="card-body">

                      <h2 className="card-title"><Highlight search= {this.props.search}>{this.props.charityInfo.name}</Highlight></h2>
        {this.state.isHovering &&
          <div className="card-attributes">
            <ul>
              <li>Cause: {this.props.charityInfo.cause}</li>
              <li>CharityNavigator Accountability Score: {this.props.charityInfo.charity_navigator_accountability_score}</li>
              <li>CharityNavigator Financial Score: {this.props.charityInfo.charity_navigator_financial_score}</li>
              <li>CharityNavigator Rating: {this.props.charityInfo.charity_navigator_score}</li>
              <li>FightPoverty Rating: {this.props.charityInfo.fight_poverty_score}</li>



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

export default CharityCard;   