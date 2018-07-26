import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { charityImages } from '../../images/charity_images'
var Highlight = require('react-highlighter');


class CharityCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charityImage: ''
    };
  }

  render() {
    
    let img_src = "https://static.makeuseof.com/wp-content/uploads/2016/01/best-sponsor-charity-670x335.jpg"
    if (!!charityImages && !!charityImages[this.props.charityInfo.name]) {
      img_src = charityImages[this.props.charityInfo.name]
    }


    return (
  <div className="col-md-4" style={{justifyContent:"center"}}>

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
                    
                           </div>
                        </Link>
          </div>
          </div>
          
   
  );

  }
}

export default CharityCard;   