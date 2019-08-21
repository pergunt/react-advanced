import firebase from 'firebase'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export const appName = 'react-advanced-79384';

export const firebaseConfig = {
    apiKey: "AIzaSyBdBr2ynd5sNYD43Z4iCFeMOr3MfBUTW7o",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "351736361152",
    appId: "1:351736361152:web:c3401d5a3b4fcada"
};

Enzyme.configure({adapter: new Adapter()});
firebase.initializeApp(firebaseConfig);
