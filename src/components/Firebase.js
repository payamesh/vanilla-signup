import app from "firebase/app"

const config = {
  apiKey: "AIzaSyCi9f_jqUJvjg-KcbcEg2zkLF5vT8SzAYY",
  authDomain: "loginauth-7538f.firebaseapp.com",
  databaseURL: "https://loginauth-7538f.firebaseio.com",
  projectId: "loginauth-7538f",
  storageBucket: "loginauth-7538f.appspot.com",
  messagingSenderId: "857320379106",
  appId: "1:857320379106:web:18bcd38a881420b6e504bb",
}
const Firebase = () => {
  app.initializeApp(config)
}

export default Firebase
