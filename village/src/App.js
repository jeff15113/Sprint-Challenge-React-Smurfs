import React, { Component } from "react";
import Axios from "axios";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
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

  getSmurfList = res => {
    this.setState({ smurfs: res.data });
  };

  render() {
    return (
      <div className="App">
        <header className="headerbar">
          <h1>**SMURF**</h1>
          <div className="nav">
            <NavLink to="/">Smurf List</NavLink>
            <NavLink to="/smurf-form">Add Smurf</NavLink>
          </div>
        </header>
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} getSmurfList={this.getSmurfList} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Smurfs smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
