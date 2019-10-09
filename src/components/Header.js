import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";



class Index extends React.Component {
  render() {
    return (
		<nav className="header">
	      	<ul>
		        <li>
		          <NavLink exact to="/" activeClassName="selected">Home</NavLink>
		        </li>
		        <li>
		          <NavLink exact to="/list" activeClassName="selected">Listing</NavLink>
		        </li>
	      	</ul>
    	</nav>
    );
  }
}

export default Index;