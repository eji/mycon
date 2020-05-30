export const firebaseProjectId = 'mycon-3b4ab';
export const firebaseIdTokenIssuer = `https://securetoken.google.com/${firebaseProjectId}`;

type FirebaseConfig = {
  readonly apiKey: string;
  readonly authDomain: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyCznDIFvSWpUL2V_SXaOm1ixPHq9lMu7Bo',
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
};

export default firebaseConfig;
