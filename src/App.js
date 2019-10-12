import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Listing from './components/Listing.js';
import PokemonCard from './components/Pokemon-card';
import Filterbar from './components/Filterbar.js';

import logo from './assets/img/pokedex-logo.png';


import './style.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      pokemon: [],
      pokeRef: [],
      urlnext: window.location.origin + '/home'
    };
    if ((!window.location.pathname.includes('home')) && (!window.location.pathname.includes('pokeinfo'))) {
      window.location = this.state.urlnext;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newPoke = this.state.pokeRef.filter((e) =>  e.name.toUpperCase().includes(event.target.value.toUpperCase()));
    let url = new URLSearchParams(window.location.search)
    let filter = event.target.value ? event.target.value : '';
    url.set('search', filter)
    this.setState({
      pokemon: newPoke,
      waiting: false,
      urlnext: window.location.origin + window.location.pathname +'?' + url.toString()
    });
  }

  handleSubmit(event) {
        event.preventDefault();
        window.location = this.state.urlnext;
  }

  componentDidMount() {
    try {
      let url = new URLSearchParams(window.location.search);
      let filter = url.get('search') ? url.get('search') : '';
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(res => {
          setTimeout(() => {
            this.setState({ 
              waiting: false,
              pokemon: res.data.results.filter((e) => e.name.toUpperCase().includes(filter.toUpperCase())),
              pokeRef: res.data.results
            });
          },1000)
        })
    } catch(err) {
        alert(err)
      throw err;
    }
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="main-container">
            <img className="logo" src={logo} alt="logo pokedex"/>
            { !this.state.waiting ? <Route exact path="/home" render={(props) => <Filterbar {...props} handleChange={this.handleChange} handleSubmit={ev => this.handleSubmit(ev)} /> } /> : '' }
            { !this.state.waiting ? <Route exact path="/home" render={(props) => <Listing {...props} list={this.state.pokemon} />} /> : <div className="lds-ring"><div></div><div></div><div></div><div></div></div> }
            <Route exact path="/pokeinfo/:pokemonName" render={(props) => <PokemonCard />} />   
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

