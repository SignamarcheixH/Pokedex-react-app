import React from 'react'
import PokemonSm from './Pokemon-sm.js'


class Listing extends React.Component {
	constructor(props){
    	super(props)
    	this.state = {
    		list: this.props.list
    	}
  	}
	UNSAFE_componentWillReceiveProps({list}) {
  		this.setState(
  			{...this.state,list})
	}
	render() {
		return (
			<div className="pokemon-container">
				{this.state.list.map((d,idx) => {
					return (<PokemonSm key={d.name} name={d.name} url={d.url} />)
				})}
			</div>	
		);
	}
}	

export default Listing