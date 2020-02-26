import firebase from "firebase";

export const getCollection = (collectionPath) => firebase.firestore().collection(collectionPath);

export const getStorageRef = () => firebase.storage().ref();