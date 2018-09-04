import React, { Component } from 'react';
import './App.css';
import FlagPicker from './FlagPicker';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      flags : [],
      newGame : false
    };

    
    
  }

  newGame() {
    const {flags} = this.state;
    
    const rFlags = Array(4).fill().map(()=> Math.floor(Math.random() * 250))
    let flagProps = {
      flagURL : flags[rFlags[0]].flag,
      flagName : flags[rFlags[0]].name,
      randomCountries : [flags[rFlags[1]].name,flags[rFlags[2]].name,flags[rFlags[3]].name]
    }
      
      return (<FlagPicker {...flagProps} onClick={this.reset}/>)
    
  }

  componentDidMount(){
    fetch("https://restcountries.eu/rest/v2/all").then(data => data.json()).then(flags => this.setState({flags}))
  }

 

  render() {
    let views = <div>Loading...</div>
    const {flags} = this.state;
    if (flags && flags.length > 0){
      views = <FlagPicker flags={flags}/>;
    }

    return (
      <div>
        {views}
      </div>
    );
  }
}

export default App;
