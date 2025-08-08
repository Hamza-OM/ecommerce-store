import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  getIdToken,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, email, name, role }
  const [loading, setLoading] = useState(true);

  const loadProfile = async (firebaseUser) => {
    if (!firebaseUser) return null;
    try {
      const ref = doc(db, 'profiles', firebaseUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        return {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: data.fullName || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          role: data.role || 'customer',
        };
      }
      // Create default profile if missing
      const defaultProfile = {
        fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
        role: 'customer',
        createdAt: Date.now(),
      };
      await setDoc(ref, defaultProfile);
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: defaultProfile.fullName,
        role: defaultProfile.role,
      };
    } catch (err) {
      console.error('Failed to load profile:', err);
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
        role: 'customer',
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await loadProfile(firebaseUser);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getAccessToken = async () => {
    if (!auth.currentUser) return null;
    return getIdToken(auth.currentUser, true);
  };

  const login = async (email, password) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profile = await loadProfile(cred.user);
      setUser(profile);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const register = async (email, password, fullName) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (fullName) {
        await updateProfile(cred.user, { displayName: fullName });
      }
      // Create profile document
      await setDoc(doc(db, 'profiles', cred.user.uid), {
        fullName: fullName || email.split('@')[0],
        role: 'customer',
        createdAt: Date.now(),
      }, { merge: true });
      const profile = await loadProfile(cred.user);
      setUser(profile);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout, register, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}; 