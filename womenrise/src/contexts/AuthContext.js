import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  async function signup(email, password, additionalData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      try {
        await updateProfile(user, {
          displayName: additionalData.name
        });

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          name: additionalData.name,
          email: email,
          phone: additionalData.phone,
          address: additionalData.address,
          isBusinessOwner: additionalData.isBusinessOwner,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        if (additionalData.isBusinessOwner) {
          const businessDocRef = doc(db, 'businesses', user.uid);
          await setDoc(businessDocRef, {
            ownerId: user.uid,
            ownerName: additionalData.name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: 'pending' 
          });
        }

        return user;
      } catch (error) {
        await user.delete();
        throw new Error('Failed to create user profile. Please try again.');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please use a different email or try logging in.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address. Please check and try again.');
      } else {
        console.error('Signup error:', error);
        throw new Error('Failed to create account. Please try again later.');
      }
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    setUserData(null);
    return signOut(auth);
  }

  async function fetchUserData(user) {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        return data;
      }
    }
    return null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
