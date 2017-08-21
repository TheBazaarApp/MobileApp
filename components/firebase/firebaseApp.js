import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJ3zbY8WGd_yp4QieezawVo11oV_zb-QI",
    authDomain: "bubbleu-app.firebaseapp.com",
    databaseURL: "https://bubbleu-app.firebaseio.com",
    storageBucket: "bubbleu-app.appspot.com",
    messagingSenderId: "98205665216"
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = firebaseApp.database()
