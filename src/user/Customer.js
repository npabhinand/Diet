import React, { useState, useContext } from "react";
import UserNav from "../components/UserNav";
import { Image, Card, Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ToastContainer, toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/auth_context";

function Customer() {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Calculate BMI
    const BMI = weight / (height * height);

    try {
      const userRef = doc(db, "users", currentUser.uid);

      // Use setDoc instead of updateDoc to set new values
      await updateDoc(userRef, {
        height: height,
        weight: weight,
        BMI: BMI,
      });

      toast("🦄 BMI added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding BMI:", error);
      // Handle error
    }
  };

  return (
    <div>
      <UserNav />
      <Image
        src="./bmi2.jpg"
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
          <div>
            <h2>Calculate BMI</h2>
            <FloatingLabel
              controlId="floatingInput"
              label="Height in meters"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder=""
                onChange={(e) => setHeight(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Weight in Kg"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="name@example.com"
                onChange={(e) => setWeight(e.target.value)}
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
                style={{ width: "25%" }}
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "uploading bmi" : "Submit"}
              </Button>
            </div>
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
    </div>
  );
}

export default Customer;
