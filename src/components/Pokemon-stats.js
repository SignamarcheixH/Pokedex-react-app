import React from 'react'

class Pokemon_stat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			maxPV: 255,
			maxAttack: 190,
			maxDefense: 230,
			maxSpeAttack: 194,
			maxSpeDefense: 230,
			maxSpeed: 180
		}
	}
	render() {
		const pokePV = (this.props.PV / this.state.maxPV) * 100;
		const pokeAttack = (this.props.attack / this.state.maxAttack) * 100;
		const pokeDefense = (this.props.defense / this.state.maxDefense) * 100;
		const pokeSpeAttack = (this.props.speAttack / this.state.maxSpeAttack) * 100;
		const pokeSpeDefense = (this.props.speDefense / this.state.maxSpeDefense) * 100;
		const pokeSpeed = (this.props.speed / this.state.maxSpeed) * 100;
		return (<div className="stats">
					<div className="pv">PV
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokePV}%` }}>{this.props.PV}</div>
						</div>
					</div>
					<div className="attack">Attack
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokeAttack}%` }}>{this.props.attack}</div>
						</div>
					</div>
					<div className="defense">Defense
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokeDefense}%` }}>{this.props.defense}</div>
						</div>
					</div>	
					<div className="speAttack">Spe Atk
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokeSpeAttack}%` }}>{this.props.speAttack}</div>
						</div>
					</div>	
					<div className="speDefense">Spe Def
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokeSpeDefense}%` }}>{this.props.speDefense}</div>
						</div>
					</div>	
					<div className="speed">Speed
						<div className="stat-bar">
							<div className="value" style={{ width: `${pokeSpeed}%` }}>{this.props.speed}</div>
						</div>
					</div>	
		</div>)
	}
}

export default Pokemon_stat;