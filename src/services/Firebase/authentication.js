import auth from '@react-native-firebase/auth';

class Authentication {
  authVarification(callback = () => {}) {
    return new Promise((resolve, reject) => {
      try {
        return auth().onAuthStateChanged(callback);
      } catch (e) {
        reject(e);
      }
    });
  }

  signIn(phoneNumber) {
    return new Promise((resolve, reject) => {
      try {
        const isAuth = auth().signInWithPhoneNumber(phoneNumber);
        resolve(isAuth);
      } catch (e) {
        console.log('onSubmitButton Error  >>>>>>>', e);
        reject(e);
      }
    });
  }

  signout() {
    return new Promise((resolve, reject) => {
      try {
        auth().signOut();

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
}

const FirebaseAuth = new Authentication();
export {FirebaseAuth};
