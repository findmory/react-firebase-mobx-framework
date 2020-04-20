import React, { Component } from "react";
import { observer } from "mobx-react";

import Firebase from "./Firebase";
import "./App.css";

export default observer(
  class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        users: null,
      };
    }

    componentDidMount() {
      let fb = new Firebase();
      fb.clubs().on("value", (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          users: snapshot.val(),
        });
      });
    }

    render() {
      let list = this.state.users
        ? Object.entries(this.state.users).map((item) => {
            console.log(item);
            return <li key={item[0]}>{item[1].name}</li>;
          })
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
