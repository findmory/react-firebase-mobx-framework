import React, { Component } from "react";
import { observer } from "mobx-react";

import Firebase from "./Firebase";

import ClubStore from "./ClubStore";
import "./App.css";

export default observer(
  class App extends Component {
    constructor(props) {
      super(props);

      this.fb = new Firebase();
      this.clubStore = new ClubStore();
    }

    componentDidMount() {
      // listen to changes in the 'clubs' ref
      // and set mobx store `clubs` with the firebase clubs object
      console.log(this.fb);
      this.fb.clubs().on("value", (snapshot) => {
        this.clubStore.setClubs(snapshot.val());
      });
    }

    componentWillUnmount() {
      this.fb.clubs().off();
    }

    render() {
      if (!this.fb) {
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
);
