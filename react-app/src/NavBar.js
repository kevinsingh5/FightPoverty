import React, { Component } from 'react';

class NavBar extends Component {
 
  render(){



  return(
  <header>
    	<nav className="navbar navbar-expand-md navbar-dark fixed-top navbar-custom">
        	<a className="navbar-brand" id="check" href="home.html">FightPoverty</a>
        	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          	<span className="navbar-toggler-icon"></span>
        	</button>
        	<div className="collapse navbar-collapse" id="navbarCollapse">
         		<ul className="navbar-nav ml-auto">
            		<li className="nav-item"> 
              			<a className="nav-link" href="cities.html">Cities<span className="sr-only">(current)</span></a>
           		 	</li>
           			<li className="nav-item">
             			<a className="nav-link" href="counties.html">Counties</a>
           			</li>
            		<li className="nav-item">
            			<a className="nav-link" href="charities.html">Charities</a>
            		</li>
            		<li className="nav-item">
             			<a className="nav-link" href="about.html">About</a>
            		</li>
         		</ul>
        	</div>
    	</nav>
    </header>
  );
  }
}

export default NavBar;