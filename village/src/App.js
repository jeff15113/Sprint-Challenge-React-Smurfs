import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

newSmurf = {
  name: "",
  height: "",
  age: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      newSmurf: newSmurf
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    Axios.get(`http://localhost:3333/smurfs`)
      .then(res => {
        this.setState({ smurfs: [...res.data] });
      })
      .catch(message => console.log(message));
  }

  handleChanges = e => {
    e.persist();
    this.setState(prevState => {
      return {
        newSmurf: {
          ...prevState.newSmurf,
          [e.target.name]: e.target.value
        }
      };
    });
  };

  addSmurf = e => {
    e.preventDefault();
    Axios.post(`http://localhost:3333/smurfs`, this.state.newSmurf)
      .then(res => {
        this.setState({ smurfs: res.data, newSmurf: newSmurf });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <SmurfForm />
        <Smurfs
          smurfs={this.state.smurfs}
          handleChanges={this.handleChanges}
          addSmurf={this.addSmurf}
        />
      </div>
    );
  }
}

export default App;
