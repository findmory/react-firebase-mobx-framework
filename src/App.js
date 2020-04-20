import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import "./App.css";

class App extends Component {
  componentDidMount() {
    // listen to changes in the 'clubs' ref
    // and set mobx store `clubs` with the firebase clubs object
    console.log(this.props);
    this.props.firebaseStore.clubs().on("value", (snapshot) => {
      this.props.clubStore.setClubs(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebaseStore.clubs().off();
  }

  render() {
    if (!this.props.firebaseStore) {
      return null;
    }

    const clubList = this.props.clubStore.clubList;
    console.log(clubList);

    let list = clubList
      ? clubList.map((club) => <li key={club.uid}>{club.name}</li>)
      : null;
    return (
      <>
        <h1>Clubs</h1>
        <ul>{list}</ul>
      </>
    );
  }
}

// inject makes the stores available on `this.props`
export default compose(inject("clubStore", "firebaseStore"), observer)(App);
