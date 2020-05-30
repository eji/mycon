import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from 'react-router-dom';

const config = {
  apiKey: 'AIzaSyCznDIFvSWpUL2V_SXaOm1ixPHq9lMu7Bo',
  authDomain: 'mycon-3b4ab.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

const SignInScreen: React.FC = () => {
  const history = useHistory();

  const signedInCallback = (result: any): boolean => {
    console.log('-----------------------');
    console.log(result);
    console.log('-----------------------');
    history.replace('/');
    return true;
  };

  const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: signedInCallback,
    },
  };

  firebase.auth().signInWithEmailAndPassword('hoge', 'hoge');

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignInScreen;
