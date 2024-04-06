import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import UserNav from "../components/UserNav";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library


export default function AddFeedback() {
  const { currentUser } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState("");
  // const docRef = doc(db, "feedback", currentUser["uid"]);
  const [userData, setUserData] = useState([]);
  const docRef = doc(db, "users", currentUser["uid"]);
  useEffect(() => {
    const getUserData = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
    };
    getUserData();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const documentId = uuidv4();
    await setDoc(doc(db, "feedback",documentId), {
      ...data,
      userId: currentUser["uid"],
      userName: userData.name,
      feedback: feedback,
      timestamp: serverTimestamp(),
    });
    toast("🦄 feedback sended successfully!", {
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
  return (
    <div style={{ justifyContent: "center" }}>
      <UserNav />
      <h1
        style={{
          marginTop: 50,
          padding: 20,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Add Feedback
      </h1>

      <FloatingLabel
        controlId="floatingTextarea2"
        label="Comments"
        style={{ marginLeft: 300 }}
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "200px", width: "800px" }}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </FloatingLabel>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Link to="/customer">
          <Button variant="primary" style={{ width: 300 }} onClick={onSubmit}>
            {" "}
            Add
          </Button>
        </Link>
      </div>
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
