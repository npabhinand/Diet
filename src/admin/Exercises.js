import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { doc, setDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuid } from "uuid";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

export default function Exercises() {
  const [data, setData] = useState({});
  const [exerciseName, setExerciseName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [exercises, setExercises] = useState([]);
  // const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const unique_id = uuid();
    await setDoc(doc(db, "exercise", unique_id), {
      ...data,
      exerciseName: exerciseName,
      videoUrl: videoUrl,
    });
    toast("🦄 exercise added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // navigate("/")
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
    <div>
      <Container>
        <Row>
          <Col>
            <Card
              style={{
                width: 450,
                height: 600,
                marginLeft: 5,
                alignItems: "center",
              }}
            >
              <h2 style={{ marginBottom: 20 }}>Add Exercises</h2>
              <Image
                src="./exercise1.png"
                className="w-50 h-30"
                alt="Exercise Image"
                style={{ marginBottom: 20 }}
              />

              <FloatingLabel
                controlId="floatingInput"
                label="Exercise Name"
                className="w-75 mt-30"
                style={{ marginBottom: 20 }}
              >
                <Form.Control
                  type="input"
                  placeholder="Name"
                  onChange={(e) => setExerciseName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Video url"
                className="w-75 mt-30"
                style={{ marginBottom: 50 }}
              >
                <Form.Control
                  type="input"
                  placeholder="Video URL"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </FloatingLabel>

              <Button variant="danger" className="w-50" onClick={onSubmit}>
                Add
              </Button>
            </Card>
          </Col>
          <Col xs={7}>
            <Card style={{ alignItems: "center" }}>
              <h1>Exercises</h1>

              <Table able class="table align-middle mb-0 bg-white">
                <thead class="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Video</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exer) => (
                    <tr key={exer.id}>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="align-items-center">
                            <p class="fw-bold mb-1">{exer.exerciseName}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href={exer.videoUrl} class="fw-normal mb-1">
                          videoURL
                        </a>
                      </td>

                      <td>
                        <button
                          type="button"
                          class="btn btn-link btn-sm btn-rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
