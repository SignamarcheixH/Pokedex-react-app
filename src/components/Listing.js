import React from 'react'
import Pokemon_sm from './Pokemon-sm.js'
import axios from 'axios';


class Listing extends React.Component {
	render() {
		console.log(this.state)
		return (
			<div className="pokemon-container">
				{this.props.list.map((d,idx) => {
					return (<Pokemon_sm key={idx} name={d.name} url={d.url} />)
				})}
			</div>	
		);
	}
}	

export default Listing