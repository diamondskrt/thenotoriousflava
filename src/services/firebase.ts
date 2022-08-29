import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
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

  setDoc = <T>(collectionName: string, params: T): void => {
    setDoc(doc(collection(firestore, collectionName)), params);
  };
}

export const firebaseService = new FirebaseService();
