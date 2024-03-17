import React, { useState, useEffect } from "react";
import { Card, Row,Col } from 'react-bootstrap'
// import { doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import UserNav from "../components/UserNav";
import Button from "react-bootstrap/Button";
function ViewFeedback() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getFeedback = async () => {
      const q = query(collection(db, "feedback"));
      const querySnapshot = await getDocs(q);
      const feedbackData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(feedbackData);
    };
    getFeedback();
  }, []);

  return (
   <div style={{backgroundColor:"#F1F1F1",width:"100%",height:'100%'}}>
   <UserNav/>
    <div style={{marginTop:70,marginLeft:50}}>
      <Row>
      {data.map((feedback)=>(
        <Col>
        <Card style={{width:550,padding:30,marginTop:20}} id={feedback.id}>
        <h3> {feedback.userName}</h3>
        <p>{feedback.feedback}</p>
        <div style={{textAlign:'center'}}>
        <Button
              variant="primary"
              // style={{ width: 300 }}
              >Reply</Button>
        </div>
      </Card>
      </Col>
      ))}
     
      </Row>
    </div>
    </div>
  )
}

export default ViewFeedback