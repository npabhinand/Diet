import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
// import { collection, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const docRef = doc(db, "users", currentUser["uid"]);
  useEffect(() => {
    const getUserData = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
    };
    getUserData();
  }, []);
  return (
    <div>
      <p>{userData.name}</p>
      <p>{userData.email}</p>
      <p>{userData.phone}</p>
    </div>
  );
}

export default Profile;
