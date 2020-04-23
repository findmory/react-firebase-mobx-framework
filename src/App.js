import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // deconstruct the stores for convienence
    const { clubStore, firebaseStore } = props.stores;
    this.clubStore = clubStore;
    this.firebaseStore = firebaseStore;
  }
  componentDidMount() {
    // listen to changes in the 'clubs' ref
    // and set mobx store `clubs` with the firebase clubs object
    console.log(this.props);
    this.firebaseStore.clubs().on("value", (snapshot) => {
      this.clubStore.setClubs(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.firebaseStore.clubs().off();
  }

  render() {
    if (!this.firebaseStore) {
      return null;
    }

    const clubList = this.clubStore.clubList;
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
export default compose(inject("stores"), observer)(App);
