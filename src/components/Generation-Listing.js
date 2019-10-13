import React from 'react'
import axios from 'axios'
import PokemonSm from './Pokemon-sm.js'


class GenerationListing extends React.Component {
	constructor(props){
    	super(props)
    	this.state = {
    		list: this.props.list,
    		'generation-i':'I',
    		'generation-ii': 'II',
    		'generation-iii': 'III',
    		'generation-iv': 'IV',
    		'generation-v': 'V',
    		'generation-vi': 'VI',
    		'generation-vii': 'VII'
    	}
  	}
  	async componentDidMount() {
	  try {
	  	let res = await axios.get('https://pokeapi.co/api/v2/generation')
	  	let generations = res.data.results
	  	this.setState({
	  		generations: <div className="inner">
	  					{generations.map((d,idx) => {
							return (<li key={idx} onClick={ev => this.props.handleClick(ev)}>
										<div className="generation-badge" data-value={d.name}>{this.state[d.name]}</div>
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
			<span className="generation-container">
				{ this.state.generations }
			</span>	
		);
	}
}	

export default GenerationListing




