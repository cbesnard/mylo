import { reactReduxFirebase } from 'react-redux-firebase'

// Firebase config
const firebaseConfig = {
    apiKey: 'AIzaSyBqvaUSodTQ0o9dSfWkq5PpN1E3UpHfg60',
    authDomain: 'mylo-bcfbd.firebaseapp.com',
    databaseURL: 'https://mylo-bcfbd.firebaseio.com',
    projectId: 'mylo-bcfbd',
}

const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    enableLogging: false, // enable/disable Firebase's database logging
}

export default reactReduxFirebase(firebaseConfig, config);
