import React, { useContext,useState,useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/auth_context";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function UserNav() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">Diet</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              {userData.role==="user" ? (
                <>
                  <Nav.Link href="/customer">Home</Nav.Link>
                  <Nav.Link href="/exercises">Exercises</Nav.Link>
                  <Nav.Link href="/cookedfood">Cooked Food</Nav.Link>
                  <Nav.Link href="/rawfood">Raw Food</Nav.Link>
                  <Nav.Link href="/addfeedback">Feedback</Nav.Link>
                  </>
              ) :   (
              <>
                
                  <Nav.Link href="/customer">Home</Nav.Link>
                <Nav.Link href="/viewfeedback">Feedback</Nav.Link>
                </>
                
              )}
           </Nav>
            <Nav>
              <NavDropdown title="Account" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UserNav;
