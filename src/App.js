import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header.js';
import Listing from './components/Listing.js';

import './style.css';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        waiting: true,
        pokemon: [],
      };
  }
  componentDidMount() {
    try {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
        .then(res => {
          setTimeout(() => {
            this.setState(
              { waiting: false,
                pokemon: res.data.results
              });
          },1000)
        })
    } catch(err) {
      alert(err)
      throw err;
    }
  }


  render() {
    console.log(this.state);
    return (
      <Router>
      <div className="App">
        <Header />
        <div className="main-container">
          <Listing list={this.state.pokemon} ok="true"/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

// //TODO : update APP & List , en faisant l'update directement dans App. et pas dans list

