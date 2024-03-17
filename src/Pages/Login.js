import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import Navbar1 from "../components/Navbar1";
import React, { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { query, getDocs, where, collection } from "firebase/firestore"; // Updated import
import { db } from "../firebase";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [userData, setUserData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false); // Add loading state
  const queryRef = query(collection(db, "users"), where("email", "==", email)); // Construct query

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true); // Set loading state to true
        const querySnapshot = await getDocs(queryRef); // Execute the query
        querySnapshot.forEach((doc) => {
          setUserData(doc.data()); // Set userData with the data from the document
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(true);
      } finally {
        setLoading(false); // Set loading state back to false
      }
    };
    getUserData();
  }, [email]); // Update useEffect dependency

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (email === "admin@gmail.com") {
        navigate("/admin");
        notify("👍 Login successful!");
      } 
      // else if (userData && userData.role === "supervisor") {
      //   dispatch({ type: "LOGIN", payload: user });
      //   notify("👍 Login successful!");
      //   navigate("/supervisor");
      // } 
      else {
        dispatch({ type: "LOGIN", payload: user });
        notify("👍 Login successful!");
        navigate("/customer");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      notifyError(error.message);
    }
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (errorMsgMessage) =>
    toast.error(errorMsgMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <>
      <Navbar1 />
      <Image
        src="./background.jpg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card
          style={{
            width: "26rem",
            height: "26rem",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <h1 className="text-center mb-4">Login</h1>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              style={{ width: 300 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Card>
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
    </>
  );
}

export default Login;
