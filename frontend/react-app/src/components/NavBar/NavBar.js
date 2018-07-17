import React, { Component } from 'react';




class NavBar extends Component {
  
  render(){


		const currentPath = window.location.pathname
		const getNavItem = (activeElement) => {
			return currentPath.includes(activeElement) ? "nav-item active" : "nav-item"
		}


  return(
  <header>
    	<nav className="navbar navbar-expand-md navbar-dark fixed-top navbar-custom">
        	<a className="navbar-brand" id="check" href="../home">FightPoverty</a>
        	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          	<span className="navbar-toggler-icon"></span>
        	</button>
        	<div className="collapse navbar-collapse" id="navbarCollapse">
         		<ul className="navbar-nav ml-auto">
            		<li className={getNavItem("cities")}> 
              			<a className="nav-link " href="../cities">Cities<span className="sr-only">(current)</span></a>
           		 	</li>
           			<li className={getNavItem("counties")}>
             			<a className="nav-link" href="../counties">Counties</a>
           			</li>
            		<li className={getNavItem("charities")}>
            			<a className="nav-link " href="../charities">Charities</a>
            		</li>
                <li className={getNavItem("search")}>
                  <a className="nav-link" href="../search">Search</a>
                </li>
            		<li className={getNavItem("about")}>
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