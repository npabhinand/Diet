import React, { useState ,useEffect} from "react";
import YouTube from "react-youtube";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserNav from "../components/UserNav";
import { Card } from "react-bootstrap";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function ViewExercises() {
  const [exercises, setExercises] = useState([]);

  const opts = {
    height: "400",
    width: "400",
    borderRadius:20,
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  useEffect(() => {
    const getExerciseData = async () => {
      const q = query(collection(db, "exercise"));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises(userData);
    };

    getExerciseData();
  }, []);

  return (
    <>
      <UserNav />
      <h1 className="text-center mb-10">View Exercises</h1>
      <Row>
      {exercises.map((exer) => (
        
          <Card style={{width:400,height: 500,margin:30}}>
          <Col style={{ marginLeft:-12}}>
            <div className="ratio ratio-16x9">
              <YouTube videoId={getVideoId(exer.videoUrl)} opts={opts} />
            </div>
          </Col>
          <Col style={{ marginTop: 200,textAlign:'center' }}>
            <h3>{exer.exerciseName}</h3>
            {/* <p>Ingredients</p> */}
          </Col>
          </Card>
             ))}
        </Row>
   
    </>
  );
}

const getVideoId = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }
  return videoId;
};


export default ViewExercises;
