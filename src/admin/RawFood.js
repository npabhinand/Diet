import React, { useState,useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { v4 as uuid } from "uuid";
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";
function RawFood() {
  const [data, setData] = useState({});
  const [rawFoodName, setRawFoodName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [ingredients,setIngredients]=useState("");
  const [foods, setFoods] = useState([]);
  // const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    const unique_id = uuid();
    await setDoc(doc(db, "rawfood", unique_id), {
      ...data,
      rawFoodName: rawFoodName,
      ingredients:ingredients,
      videoUrl:videoUrl
    });
    toast('🦄 raw food added successfully!', {
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
    const unsubscribe = onSnapshot(collection(db, "rawfood"), (snapshot) => {
      const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoods(userData);
    });

    // Unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
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
              <h2 style={{padding:10}}>Add Raw Food</h2>

              <Image
                src="./raw.jpg"
                className="w-50 h-30"
                alt="raw Food"
                style={{ marginBottom: 20 }}
              />

              <FloatingLabel
                controlId="floatingInput"
                label="Food Name"
                className="w-75 mt-30"
                style={{ marginBottom: 20 }}
              >
                <Form.Control type="input" placeholder="Food Name" 
                onChange={(e) => setRawFoodName(e.target.value)}/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Video url"
                className="w-75 mt-30"
                style={{ marginBottom: 20 }}
              >
                <Form.Control type="input" placeholder="Video URL" onChange={(e) => setVideoUrl(e.target.value)}/>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Ingredients"
                className="w-75 mt-30"
                style={{ marginBottom: 50 }}
              >
                <Form.Control type="input" placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)}/>
              </FloatingLabel>

              <Button variant="danger" className="w-50" onClick={onSubmit}>
                Add
              </Button>
            </Card>
          </Col>
          <Col xs={7}>
            <Card style={{ alignItems: "center" }}>
              <h1>Raw Foods</h1>
             
              <Table able class="table align-middle mb-0 bg-white">
                <thead class="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Video url</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {foods.map(food => (
                  <tr id={food.id}>
                    <td>
                      <div class="d-flex align-items-center">
                        
                        <div class="align-items-center">
                          <p class="fw-bold mb-1">{food.rawFoodName}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        
                        <div class="align-items-center">
                          <p class="fw-bold mb-1">{food.ingredients}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href={food.videoUrl}class="fw-normal mb-1">Video Link</a>
                     
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

export default RawFood;
