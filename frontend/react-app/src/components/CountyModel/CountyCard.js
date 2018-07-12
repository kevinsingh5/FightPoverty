import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CountyCard extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
    <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <a href="#">

                 <Link to={{pathname: '/counties/'+ this.props.countyInfo.name, state: this.props.countyInfo}} style = {{textDecoration:'none', color:'black'}}>

                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="https://static1.squarespace.com/static/56cca10d8a65e25ea16a6f61/577bd5da03596e2e04790355/58f7743f17bffc227ada0999/1492612209831/travis+county.png?format=300w" />
                <div className="card-body">
                  <h2 className="card-title">{this.props.countyInfo.name}</h2>
                </div>
              </Link>
            </a>
            </div>
          </div>
   
  );

  }
}

export default CountyCard;   