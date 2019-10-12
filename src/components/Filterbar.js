import React from 'react'

class Filterbar extends React.Component {
	constructor(props) {
  		super(props);
		this.state = { 
			value: props.value
		};
	}
	render() {
		return  (
			<form onSubmit={ ev => this.props.handleSubmit(ev) }>
				<input type="text" className="input search" onChange={this.props.handleChange} />
				<button className="search-button"></button>
			</form>
		)		
	}
}

export default Filterbar;