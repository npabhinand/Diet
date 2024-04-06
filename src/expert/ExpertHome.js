import React, { useEffect,useState } from "react";
import UserNav from "../components/UserNav";
import { Card, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, query, getDocs,where } from "firebase/firestore";
import { db } from "../firebase";
function ExpertHome() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"), where("role", "==", "user"));;
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    };

    getUserData();
  }, []);

  const onSubmit=()=>{

  }
  return (
    <div>
      <UserNav />
      <div style={{marginTop:65,marginLeft:20}}>
        <Row>
          
          {users.map((user) => (
        <Col>
        <Card style={{width:500,height: 250,margin:30,alignSelf:'center'}}>
            {/* <Col style={{ marginTop: 20,textAlign:'center' }}>{user.email}</Col> */}
            <Col style={{ marginTop: 10,textAlign:'center' }}>Name: {user.name}</Col>
            <Col style={{ marginTop: 10,textAlign:'center' }}>Phone Number: {user.phone}</Col>
            <Col style={{ marginTop: 10,textAlign:'center' }}>height: {user.height}</Col>
            <Col style={{ marginTop: 10,textAlign:'center' }}>weight: {user.weight}</Col>
            <Col style={{ marginTop: 10,textAlign:'center' }}>BMI: {user.BMI}</Col>
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          <Button variant="primary" style={{ width: 200,marginBottom:20 }} onClick={onSubmit}>
            {" "}
            Suggest Diet
          </Button>
          </div>
          </Card>
          </Col>
          ))}
          
        </Row>
      
      </div>
      

    </div>
  );
}

export default ExpertHome;
