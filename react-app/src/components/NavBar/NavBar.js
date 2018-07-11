import React, { Component } from 'react';

class NavBar extends Component {
 
  render(){



  return(
  <header>
    	<nav className="navbar navbar-expand-md navbar-dark fixed-top navbar-custom">
        	<a className="navbar-brand" id="check" href="../home">FightPoverty</a>
        	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          	<span className="navbar-toggler-icon"></span>
        	</button>
        	<div className="collapse navbar-collapse" id="navbarCollapse">
         		<ul className="navbar-nav ml-auto">
            		<li className="nav-item"> 
              			<a className="nav-link active" href="../cities">Cities<span className="sr-only">(current)</span></a>
           		 	</li>
           			<li className="nav-item">
             			<a className="nav-link active" href="../counties">Counties</a>
           			</li>
            		<li className="nav-item">
            			<a className="nav-link active" href="../charities">Charities</a>
            		</li>
            		<li className="nav-item active">
             			<a className="nav-link" href="../about">About</a>
            		</li>
         		</ul>
        	</div>
    	</nav>
    </header>
  );
  }
}

export default NavBar;