import React from 'react'
import axios from 'axios';
import PokemonStat from './Pokemon-stats';
import { BrowserRouter as Route, Link } from "react-router-dom";

import pokeIcon from '../assets/icon/pokeball.png';



class Pokemon_card extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			waiting: false,
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
		console.log('here')
  		this.fetchPokemonFromUrl();
  		this.fetchEvolutionChain();
	}
	fetchEvolutionChain = async() => {
		try {
			let pokeName = window.location.pathname.split('/').pop();
			let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
	  		let pokeInfos = res.data
	  		let resa = await axios.get(pokeInfos.species.url)
	  		let chain = await axios.get(resa.data['evolution_chain'].url);
	  		let dataaa = chain.data.chain
	  		let preEvol = [];
	  		let nextEvol = [];
	  		let destination = 'prev';
	  		let keepGoing = true;
	  		while(keepGoing) {
	  			console.log(dataaa.species.name);
				let picture = await axios.get(dataaa.species.url)
				picture = await axios.get(picture.data.varieties[0].pokemon.url)
				picture = picture.data.sprites['front_default']
	  			if(!dataaa['evolves_to'].length) {
	  				keepGoing= false;
	  			}
	  			if(dataaa.species.name === pokeName) {
	  				destination = 'next';
	  				dataaa = dataaa['evolves_to'][0] 
	  				continue;
	  			}
	  			if(destination === 'prev') {
	  				preEvol.push(
	  					<a key={dataaa.species.name} className="link" href={`/pokeinfo/${dataaa.species.name}`}>
	  						<div className="evol-badge" style={{ backgroundImage: 'url('+ picture +')' }}></div>
	  						<div className="name">{ dataaa.species.name }</div>
	  					</a>)
	  			} else {
	  				nextEvol.push(
						<a key={dataaa.species.name} className="link" href={`/pokeinfo/${dataaa.species.name}`}>
	  						<div className="evol-badge" style={{ backgroundImage: 'url('+ picture +')' }}></div>
	  						<div className="name">{ dataaa.species.name }</div>
	  					</a>)
	  			}
	  			dataaa = dataaa['evolves_to'][0]
	  		}
	  		this.setState({
	  			preEvol: preEvol,
	  			nextEvol: nextEvol
	  		})
		} catch (err) {
			alert(err)
		}
	}

	fetchPokemonFromUrl = async() => {
	  try {
	  	let pokeName = window.location.pathname.split('/').pop();
	  	let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
	  	let pokeInfos = res.data
	   	const mainType = pokeInfos.types.filter((e) => e.slot === 1)
	    const colorHex = this.state[mainType[0].type.name];
	    this.setState({
	    	colorHex: colorHex
	    })
	    const pv = pokeInfos.stats.filter((e) => e.stat.name === 'hp')[0];
	    const attack = pokeInfos.stats.filter((e) => e.stat.name === 'attack')[0];
	    const defense = pokeInfos.stats.filter((e) => e.stat.name === 'defense')[0];
	    const speAttack = pokeInfos.stats.filter((e) => e.stat.name === 'special-attack')[0];
	    const speDefense = pokeInfos.stats.filter((e) => e.stat.name === 'special-defense')[0];
	    const speed = pokeInfos.stats.filter((e) => e.stat.name === 'speed')[0];
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
							return (<li key={idx}>
										<img className="poke-icon" alt="poke-icon" src={pokeIcon} />
										{d.move.name}
									</li>)
						})}
					</ul>
					<PokemonStat PV={pv.base_stat} attack={attack.base_stat} defense={defense.base_stat} speAttack={speAttack.base_stat} speDefense={speDefense.base_stat} speed={speed.base_stat}/>
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
		return (<div>
			{this.state.Item}
			<div className="pre-evol" style={{ border: `10px solid ${this.state.colorHex}` }}>
				{this.state.preEvol}
			</div>
			<div className="next-evol" style={{ border: `10px solid ${this.state.colorHex}` }}>
				{this.state.nextEvol}
			</div>
		</div>)
	}
}

export default Pokemon_card;