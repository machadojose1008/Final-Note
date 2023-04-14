// Arquivo de configuração do Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

// Inicialize o SDK do Firebase com as suas configurações
const app = initializeApp(firebaseConfig);

// Instancia do provedor que será usado para o usuário 
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});


// Funções de configuração do firebase Auth
export const auth = getAuth();
// Log in com o google 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
// Instânciação do banco de dados do firestore
export const db = getFirestore(app);

/*
  Na manipulação de dados do firestore utilizando o Authenticator do firebase precisamos fazer os dois sistemas conversarem

  1) utilizamos a função signin (sendo tanto com email e senha como com outras formas de autenticação) para recuperar um objeto user
    no caso do final-note isso é feito no componente signIn.
  2) Criamos uma função que vai receber esse user do Auth e com a função 'doc' criar uma referência que será usada posteriormente tanto para modificar dados como 
    para criar dados e documentos. isso é feito na função 'createUserDocumentFromAuth'. Cada referência precisa de uma chave para usar e no caso usaremos o UID que é 
    dado como resposta do signInWithGoogle.
  3)  Após isso podemos usar o userDocRef para o getDoc que recuperará documentos com aquele ID ou no setDoc que modificará documentos.





*/


export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
  ) => {
  if(!userAuth) return;
  // Criação da referência do usuário para alteração de dados no firestore usando o 'UID' que é passado na resposta do seu login
  const userDocRef = doc(db, 'users', userAuth.uid);

  // Criação de uma referência com funções no banco de dados para recuperação de dados 
  const userSnapshot = await getDoc(userDocRef);
  

  // NO if abaixo vamos criar o usuário se ele não existir no banco de dados
  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
/*
export const getUserEmail = async (id) => {
  if(!id) return;

  return await {
    db.collection("users")
      .doc(id)
      .get()
      .then(doc => {
        console.log(doc.data())
      })
  }
};
*/

export const createAuthUserWithEmailAndPassword = async (email, password)  => {

  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)

};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email,password);
  
    

};

