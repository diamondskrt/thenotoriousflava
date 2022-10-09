import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
} from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { auth, firestore } from 'boot/firebase';

class FirebaseService {
  signIn = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  signOut = (): Promise<void> => {
    return signOut(auth);
  };

  getDoc = (collectionName: string, uid: string): DocumentData => {
    return getDoc(doc(firestore, collectionName, uid));
  };

  getDocs = (collectionName: string): DocumentData => {
    return getDocs(collection(firestore, collectionName));
  };

  setDoc = <T>(collectionName: string, params: T): void => {
    setDoc(doc(collection(firestore, collectionName)), params);
  };

  updateDoc = <T>(collectionName: string, uid: string, data: T) => {
    updateDoc(doc(firestore, collectionName, uid), data);
  };

  deleteDoc = (collectionName: string, uid: string) => {
    deleteDoc(doc(firestore, collectionName, uid));
  };
}

export const firebaseService = new FirebaseService();
