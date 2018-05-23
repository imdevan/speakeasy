export default {
  // TODO: move to .env
  firebaseConfig: {
    apiKey: "AIzaSyBfKezBXsgyQaYbBcwxx1vC_nvbxunJkjA",
    authDomain: "major-key-mapper.firebaseapp.com",
    databaseURL: "https://major-key-mapper.firebaseio.com",
    storageBucket: "major-key-mapper.appspot.com",
  },
  // react-redux-firebase options
  rrfConig:{
    userProfile: 'users', // firebase root where user profiles are
    enableLogging: true, // enable/disable Firebase's database loggingstored
  }
}
