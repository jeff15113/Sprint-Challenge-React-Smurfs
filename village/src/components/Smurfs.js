import React, { Component } from "react";
import Axios from "axios";
import Smurf from "./Smurf";

class Smurfs extends Component {
  deleteSmurf = (e, id) => {
    e.persist();
    console.log(id);
    Axios.delete(`http://localhost:3333/smurfs/${id}`).then(data => {
      this.props.getSmurfList(data);
    });
  };

  render() {
    return (
      <div className="Smurfs">
        {console.log(this.props)}
        <h1>Smurf Village</h1>
        <ul className="cardcontainer">
          {this.props.smurfs.map(smurf => {
            return (
              <Smurf
                deleteSmurf={this.deleteSmurf}
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

Smurf.defaultProps = {
  smurfs: []
};

export default Smurfs;
