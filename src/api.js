import db from './firebase.config';
import { collection, Timestamp, addDoc, doc, getDoc } from 'firebase/firestore';
import { getUser } from './utils';

const usersRef = collection(db, 'users');

export async function signup(credentials) {
  const { github, email, password } = credentials;

  if (!(github && email && password)) {
    throw new Error('Please enter all the details');
  }

  try {
    await getUser(github);
  } catch (err) {
    throw new Error('Invalid github id');
  }

  if (password.length < 8) {
    throw new Error('Password must be 8 characters long');
  }

  const docRef = await addDoc(usersRef, {
    createdAt: Timestamp.fromDate(new Date()),
    ...credentials,
  });

  const docSnap = await getDoc(docRef);
  console.log(docSnap.id, docSnap.data());

  //   const newDocRef = doc(db, )
}
