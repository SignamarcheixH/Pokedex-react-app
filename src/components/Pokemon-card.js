import React from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Pokemon_card extends React.Component {
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
  		this.fetchPokemonFromUrl();
	}
	fetchPokemonFromUrl = async() => {
	  try {
	  	let pokeName = window.location.pathname.split('/').pop();
	  	let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
	  	let pokeInfos = res.data
	   	const mainType = pokeInfos.types.filter((e) => e.slot === 1)
	    const colorHex = this.state[mainType[0].type.name];
	    this.setState({
	      Item: 
			<div className="pokemon-card" style={{ border: `10px solid ${colorHex}` }}>
      			<div className="name-placeholder">{pokeInfos.name}</div>
      			<div className="pictures">
					<div className="picture front" style={{ backgroundImage: 'url('+ pokeInfos.sprites['front_default'] +')'}}></div>
					<div className="picture back" style={{ backgroundImage: 'url('+ pokeInfos.sprites['back_default'] +')'}}></div>
					<div className="picture shiny" style={{ backgroundImage: 'url('+ pokeInfos.sprites['front_shiny'] +')'}}></div>
				</div>	
				<div className="weight-height">
					<div className="height"><span>Height :</span> {pokeInfos.height / 10}m</div>
					<div className="weight"><span>Weight : </span>{pokeInfos.weight / 10 }kg</div>
				</div>
				<div className="stats-moves">
					<ul className="moves">
						{pokeInfos.moves.map((d,idx) => {
							return (<li key={idx}>{d.move.name}</li>)
						})}
					</ul>
					<div className="stats">Coming soon : Stats component </div>
				</div>
				<div className="types">
					{pokeInfos.types.map((d,idx) => {
		   		 		const colorType = this.state[d.type.name];
						return (<div key={idx} className="type-badge" style={{ backgroundColor: colorType  }}>{d.type.name}</div>)
					})}
				</div>	
			</div>
	    });
	  } catch (err) {
	    console.log(err);
	  }
	}
	
	render() {
		return (<span>{this.state.Item}</span>)
	}
}

export default Pokemon_card;