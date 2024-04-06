import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase";
import Navbar1 from "../components/Navbar1";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SignUp = ({ inputs }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user"); // State to hold the selected role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the role based on the selected radio button
      const userData = {
        email: email,
        phone: phone,
        name: name,
        role: role, // Set the role value here
      };

      // Store user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      toast("🦄 Successfully created account!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar1 />
      <Image
        src="./background1.jpg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card
          style={{
            width: "26rem",
            height: "31rem",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <h1 className="text-center mb-4">Sign Up</h1>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontWeight: '500', margin: 10}}>
            <Form.Check
              type="radio"
              aria-label="radio 1"
              onChange={() => setRole("expert")} 
              checked={role === "expert"}
              style={{marginRight:5}} 
            />
            Expert
            <Form.Check
              type="radio"
              aria-label="radio 2"
              style={{ marginLeft: 20 ,marginRight:5}}
              onChange={() => setRole("user")} 
              checked={role === "user"} 
              
            />
            User
          </div>

          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
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
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="phone"
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
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
              onClick={handleSignup}
            >
              {" "}
              Sign Up
            </Button>
          </div>
          <a
            style={{ alignItems: "center", textAlign: "center", marginTop: 10 }}
          >
            <Link to={"/login"}>Need to login ?</Link>
          </a>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
