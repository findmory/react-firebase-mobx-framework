import { observable, action, computed, decorate } from "mobx";

class ClubStore {
  clubs = null;

  constructor(rootStore) {
    // if he needs access to any other store
    // it's available on this.rootStore.<other_store>
    this.rootStore = rootStore;
    console.log(this.rootStore);
  }

  setClubs = (clubs) => {
    this.clubs = clubs;
  };

  // convert the object to an array for list display
  get clubList() {
    return Object.keys(this.clubs || {}).map((key) => ({
      ...this.clubs[key],
      uid: key,
    }));
  }
}

decorate(ClubStore, {
  clubs: observable,
  clubList: computed,
  setClubs: action,
});

export default ClubStore;
