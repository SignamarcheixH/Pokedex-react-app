import React from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Pokemon_sm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			normal: '#A8A77A' ,
			fighting: '#C22E28',
			flying: '#A98FF3',
			poison: '#A33EA1',
			ground: '#E2BF65',
			rock: '#B6A136',
			bug: '#A6B91A',
			ghost: '#735797',
			steel: '#B7B7CE',
			fire: '#EE8130',
			water: '#6390F0',
			grass: '#7AC74C',
			electric: '#F7D02C',
			psychic: '#F95587',
			ice: '#96D9D6',
			dragon: '#6F35FC',
			dark: '#705746',
			fairy: '#D685AD',
			unknown: '#FFFFFF',
			shadow: '#FFFFFF',
		}
	}
	componentDidMount() {
  		this.renderPosts();
	}
	renderPosts = async() => {
	  try {
	    let res = await axios.get(this.props.url);
	    let item = res.data;
	    const mainType = item.types.filter((e) => e.slot === 1)
	    const colorHex = this.state[mainType[0].type.name];
	    this.setState({
	      Item: 
	      	<div className="pokemon-small-card">
	      		<div className="filter" style={{ backgroundColor: colorHex }}></div>
	      		<div className="picture">
					<div className="inner" style={{ backgroundImage: 'url('+ item.sprites['front_default'] +')'}}></div>
				</div>	
				<div className="name-placeholder">{this.props.name}</div>
	    	</div>
	    });
	  } catch (err) {
	    console.log(err);
	  }
	}
	
	render() {
		return (<Link className="link" to={`/pokeinfo/${this.props.name}`}>{this.state.Item}</Link>)
	}
}

export default Pokemon_sm;