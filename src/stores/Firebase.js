import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
class Firebase {
  constructor(rootStore) {
    app.initializeApp(config);

    this.db = app.database();

    // if he needs access to any other store
    // it's available on this.rootStore.<other_store>
    this.rootStore = rootStore;
    console.log(this.rootStore);
  }

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  clubs = () => this.db.ref("clubs");

  club = (cid) => this.db.ref(`clubs/${cid}`);
}

export default Firebase;
