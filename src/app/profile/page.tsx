// app/profile/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import "./profile.css"

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user?.uid);
      const uid=user?.uid;
      if (user) {
        setUser(user);
        const usersCollection = collection(db, "users");
        const q=query(
          usersCollection,
          where("uid","==",uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setUserData(data[0]);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Profile Page</h1>
      {userData && (
        <div className="space-y-2">
          <p><strong>Uid:</strong> {userData.uid}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Department:</strong> {userData.department}</p>
          <p><strong>Year:</strong> {userData.year}</p>
          <p><strong>Contact No:</strong> {userData.contactNo}</p>
          <p><strong>College Name:</strong> {userData.collegeName}</p>
          <p><strong>Degree:</strong> {userData.degree}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
