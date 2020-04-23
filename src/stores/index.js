import ClubStore from "./ClubStore";
import FirebaseStore from "./Firebase";

class RootStore {
  constructor() {
    this.clubStore = new ClubStore(this);
    this.firebaseStore = new FirebaseStore(this);
  }
}

//const rootStore = new RootStore();
export default RootStore;
