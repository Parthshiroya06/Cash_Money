import firestore from '@react-native-firebase/firestore';

class CloudFirestore {
  createConnectionId(phoneNo1, phoneNo2) {
    if (phoneNo1 > phoneNo2) {
      return `${phoneNo1}${phoneNo2}`;
    } else {
      return `${phoneNo2}${phoneNo1}`;
    }
  }

  collections(collectionName) {
    return new Promise((resolve, reject) => {
      try {
        const firestores = firestore().collection(collectionName);
        resolve(firestores);
      } catch (e) {
        reject(e);
      }
    });
  }
}

const Firestore = new CloudFirestore();
export {Firestore};
