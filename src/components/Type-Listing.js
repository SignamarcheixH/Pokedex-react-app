import React from 'react'
import axios from 'axios'
import PokemonSm from './Pokemon-sm.js'


class TypeListing extends React.Component {
	constructor(props){
    	super(props)
    	this.state = {
    		list: this.props.list,
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
  	async componentDidMount() {
	  try {
	  	let res = await axios.get('https://pokeapi.co/api/v2/type')
	  	let types = res.data.results.slice(0,-2)
	  	this.setState({
	  		types: <div className="inner">
	  					{types.map((d,idx) => {
	  						const colorType = this.state[d.name];
							return (<li key={idx} onClick={ev => this.props.handleClick(ev)}>
										<div className="type-badge" style={{ backgroundColor: colorType  }} data-value={d.name}>{d.name}</div>
									</li>)
						})}
	  				</div>
	  	})	   
  		} catch (err) {
  			alert(err)
  		}
  	}	
	render() {
		return (
			<span className="types-container">
				{ this.state.types }
			</span>	
		);
	}
}	

export default TypeListing




