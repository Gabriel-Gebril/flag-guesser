import React, {Component} from "react";

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class FlagPicker extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        
        this.state = {
            rFlags : Array(4).fill().map(()=> Math.floor(Math.random() * 250)),
            incorrect : false,
            win : false,
            selectedCountry : '',
            flags : this.props.flags
        }
        this.reset = this.reset.bind(this);
    }

    reset(){
        this.setState({incorrect:false,win:false,rFlags : Array(4).fill().map(()=> Math.floor(Math.random() * 250))})
    }

    handleSubmit(e){
        console.log(this.state.selectedCountry)
        e.preventDefault();
        if (this.state.selectedCountry === ""){
            return
        }
        if(this.state.selectedCountry === this.state.flags[this.state.rFlags[0]].name){
            this.setState({win : true, selectedCountry : ""})
        }else{
            this.setState({incorrect : true, selectedCountry : ""})
        }
    }

    handleOptionChange(e){
        this.setState({selectedCountry : e.target.value});
    }
    
    render(){
        const {flagURL,flagName,randomCountries} = {
            flagURL : this.state.flags[this.state.rFlags[0]].flag,
            flagName : this.state.flags[this.state.rFlags[0]].name,
            randomCountries : [this.state.flags[this.state.rFlags[1]].name,this.state.flags[this.state.rFlags[2]].name,this.state.flags[this.state.rFlags[3]].name]  
        };
        const countryOut = [...randomCountries,this.state.flags[this.state.rFlags[0]].name];
        console.log(flagName);
        // console.log(countryOut);
        let views =  <form onSubmit={this.handleSubmit}>
                        {countryOut.map((e,i)=>{
                            return(
                                [<input key={i} type="radio" value={e} 
                                checked={this.state.selectedCountry === e}
                                onChange={this.handleOptionChange}
                                />,
                                <label key={e+i} htmlFor={e}>{e}</label>]
                            
                            ) 
                        })}
                        <button type="submit">Guess</button>
                    </form>
        if (this.state.incorrect){
            views = <p>WRONG! The right answer is {flagName}. <button onClick={this.reset}>New Game</button> </p>
        }else if(this.state.win){
            views = <p>WIN! <button onClick={this.reset}>New Game</button></p>
        }
        return(
            <div>
                {views}
                <img src={flagURL} alt="Guess the flag!"></img>
            </div>
        );
    }
}

export default FlagPicker;