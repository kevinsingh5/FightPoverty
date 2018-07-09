import React, { Component } from 'react';

class Carousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      onHP: true
    };
  }


  render(){
  return(
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="first-slide" src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Boston-Skyline-Picture-HD.jpg" alt="First slide" />
            <div className="container">
              <div className="carousel-caption text-left">
                <h1>Cities</h1>
                <p>Browse our huge database of cities in the U.S.</p>
                <p><a className="btn btn-lg btn-primary" role="button" href= "cities">Cities</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="second-slide" src="https://static01.nyt.com/images/2016/05/04/business/04SHARSWOOD-SS-slide-BJIW/04SHARSWOOD-SS-slide-BJIW-superJumbo.jpg?quality=75&auto=webp&disable=upscale" alt="Second slide" />
            <div className="container">
              <div className="carousel-caption">
                <h1>Counties</h1>
                <p>Look up any of the counties in the U.S. and find out information about local charities and poverty statistics</p>
                <p><a className="btn btn-lg btn-primary" href="counties" role="button">Counties</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="third-slide" src="https://files.blog.turbotax.intuit.com/2013/09/istock_000018254025small.jpg?w=653&h=352&crop=1" alt="Third slide" />
            <div className="container">
              <div className="carousel-caption text-right">
                <h1>Charities</h1>
                <p>Browse our list of charities and organizations and find one you would like to help out</p>
                <p><a className="btn btn-lg btn-primary" href="charities" role="button">Charities</a></p>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
    </div>
  );
  }
}

export default Carousel;