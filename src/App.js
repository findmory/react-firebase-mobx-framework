import React, { Component } from "react";
import { observer } from "mobx-react";

import Firebase from "./Firebase";
import "./App.css";

export default observer(
  class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        clubs: null,
      };
    }

    componentDidMount() {
      // get a firebase ref
      let fb = new Firebase();

      // listen to changes in the 'clubs' ref
      fb.clubs().on("value", (snapshot) => {
        let snapObj = snapshot.val();

        // convert the object to an array for list display
        this.setState({
          clubs: Object.keys(snapObj || {}).map((key) => ({
            ...snapObj[key],
            uid: key,
          })),
        });
      });
    }

    render() {
      console.log(this.state.clubs);

      let list = this.state.clubs
        ? this.state.clubs.map((club) => <li key={club.uid}>{club.name}</li>)
        : null;
      return (
        <>
          <h1>Clubs</h1>
          <ul>{list}</ul>
        </>
      );
    }
  }
);
