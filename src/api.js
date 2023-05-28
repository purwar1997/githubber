import db from './firebase.config';
import { collection, Timestamp, addDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getUser } from './utils';

const usersRef = collection(db, 'users');

export async function signup(credentials) {
  const { github, email, password } = credentials;

  if (!(github && email && password)) {
    throw new Error('Please enter all the details');
  }

  let user = await getUser(github);

  if (!user.id) {
    throw new Error('Github account not found');
  }

  if (password.length < 8) {
    throw new Error('Password must be atleast 8 characters long');
  }

  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error('Email already registered');
  }

  const docRef = await addDoc(usersRef, {
    createdAt: Timestamp.fromDate(new Date()),
    ...credentials,
  });

  const docSnap = await getDoc(docRef);
  user = { id: docSnap.id, ...docSnap.data };
  user.password = undefined;

  return user;
}

export async function login(credentials) {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error('Please enter all the details');
  }

  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Email not registered');
  }

  const user = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];

  if (password !== user.password) {
    throw new Error('Incorrect password');
  }

  user.password = undefined;

  return {
    user,
    token: 'This is a dummy token',
  };
}
