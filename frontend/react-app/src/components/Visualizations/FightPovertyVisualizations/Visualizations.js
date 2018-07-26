import React, { Component } from 'react';
import Visualization1 from './Visualization1';
import Visualization2 from './Visualization2';
import Visualization3 from './Visualization3';


class Visualizations extends Component {
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
                <h1 className="jumbotron-heading" >Visualizations</h1>
                <p className="lead text-muted">Created using D3</p>
            </div>
        </section>

        <Visualization2 />
        <Visualization1 /> 
        <Visualization3 />

      </div>

    );

  }
}

export default Visualizations;   