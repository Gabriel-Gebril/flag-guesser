import React, { Component } from "react";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class FlagPicker extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.ranIn = this.ranIn.bind(this);

    const countryOut = shuffle([
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)]
    ]);

    this.state = {
      incorrect: false,
      win: false,
      selectedCountry: "",
      flags: this.props.flags,
      countryOut: countryOut,
      rightFlag: countryOut[this.ranIn(4)]
    };

    this.reset = this.reset.bind(this);
  }

  ranIn(n) {
    return Math.floor(Math.random() * n);
  }

  reset() {
    const countryOut = shuffle([
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)],
      this.props.flags[this.ranIn(250)]
    ]);
    this.setState({
      incorrect: false,
      win: false,
      countryOut: countryOut,
      rightFlag: countryOut[this.ranIn(4)]
    });
  }

  handleSubmit(e) {
    // console.log(this.state.selectedCountry);
    e.preventDefault();
    if (this.state.selectedCountry === "") {
      return;
    }
    if (this.state.selectedCountry === this.state.rightFlag.name) {
      this.setState({
        win: true,
        selectedCountry: "",
        countryOut: shuffle([
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)]
        ])
      });
    } else {
      this.setState({
        incorrect: true,
        selectedCountry: "",
        countryOut: shuffle([
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)],
          this.props.flags[this.ranIn(250)]
        ])
      });
    }
  }

  handleOptionChange(e) {
    this.setState({ selectedCountry: e.target.value });
  }

  render() {
    const { flagURL, flagName } = {
      flagURL: this.state.rightFlag.flag,
      flagName: this.state.rightFlag.name
    };

    // console.log(countryOut);
    let views = (
      <form onSubmit={this.handleSubmit}>
        {this.state.countryOut.map((e, i) => {
          return [
            <input
              key={i}
              type="radio"
              value={e.name}
              checked={this.state.selectedCountry === e.name}
              onChange={this.handleOptionChange}
            />,
            <label key={e.name + i} htmlFor={e.name}>
              {e.name}
            </label>
          ];
        })}
        <button type="submit">Guess</button>
      </form>
    );
    if (this.state.incorrect) {
      views = (
        <p>
          WRONG! The right answer is {flagName}.{" "}
          <button onClick={this.reset}>New Game</button>{" "}
        </p>
      );
    } else if (this.state.win) {
      views = (
        <p>
          WIN! <button onClick={this.reset}>New Game</button>
        </p>
      );
    }
    return (
      <div>
        {views}
        <img src={flagURL} alt="Guess the flag!" />
      </div>
    );
  }
}

export default FlagPicker;
