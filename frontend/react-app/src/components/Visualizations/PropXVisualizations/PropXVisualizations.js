import React, { Component } from 'react';
import PropXVisualization1 from './PropXVisualization1';
import PropXVisualization2 from './PropXVisualization2';
// import PropXVisualization3 from './PropXVisualization3';


class PropXVisualizations extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {

    return (
      <div>
        <section className="jumbotron text-center">
            <div className="container" style={{ marginBottom: "50px" }}>
                <h1 className="jumbotron-heading" >
                  <a href="http://propxdoeswhat.me">
                  PropXDoesWHAT 
                  </a>                  
                  &nbsp;Visualizations
                </h1>
                <p className="lead text-muted">Created using D3</p>
            </div>
        </section>
        
        
        <PropXVisualization1 /> 
        <PropXVisualization2 />

        {/*
        <PropXVisualization3 />
        */}

      </div>

    );

  }
}

export default PropXVisualizations;   