import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Card from "react-bootstrap/Card";
import { Col, Row,Image,Button } from "react-bootstrap";
import UserNav from "../components/UserNav"
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();


  const docRef = doc(db, "users", currentUser["uid"]);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
    };
    getUserData();
  }, []);

  function signout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  }

  return (
    <div>
      <UserNav/>
      <Card style={{ width: "90%", padding: 20, top: 100 }}>
        <Row>
          <Col md={6}>
            <Image src="./user.png" style={{width:"50%"}}/>

          </Col>
          <Col md={6}>
          <div>
            <div style={{width:"50%",backgroundColor:"#15395A",height:120,padding:20,borderRadius:10,marginBottom:20}}>
              <h2 style={{color:"white",textAlign:"center",}}>{userData.name}</h2>
              <h4 style={{color:"#AAA54D"}}>{userData.role}</h4>
              </div>
              <p>Role: {userData.role}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
            </div>
            <div>
              <Button onClick={signout}>Logout</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Profile;
