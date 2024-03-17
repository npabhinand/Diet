import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import Exercises from "./Exercises";
import RawFood from "./RawFood";
import CookedFood from "./CookedFood";
import "../styles/sidebar.css";

export default function Admin() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(<Users />);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  function signout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login"); // Fixed typo here
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  }
  return (
    <div
      className="bg-color- container-fluid d-flex border-1 card-with-border"
      sticky="top"
    >
      <div
        className="col-auto col-md-2 min-vh-100 d-flex flex-column"
        style={{ backgroundColor: "#3B71CA" }}
      >
        <div className="d-flex align-items-center ms-3 mt-2">
          <i className="fs-4 bi vi-speedometer"></i>
          <span className="ms-1 fs-4 text-dark">Diet</span>
          <hr className="text-secondary" />
        </div>

        <ul className="nav nav-pills flex-column mt-3 mb-auto">
          <li
            className={`nav-item text-dark fs-4 my-1 ${
              selectedComponent === <Users /> ? "active" : ""
            }`}
            onClick={() => handleComponentClick(<Users />)}
          >
            <div className="nav-link" aria-current="page">
              <i className="bi bi-speedometer2"></i>
              <Image src="./users.png" width={30} height={30} />
              <span className="ms-2 text-dark">Users</span>
            </div>
          </li>
          <li
            className={`nav-item text-dark fs-4 my-1 ${
              selectedComponent === <Exercises /> ? "active" : ""
            }`}
            onClick={() => handleComponentClick(<Exercises />)}
          >
            <div className="nav-link" aria-current="page">
              <i className="bi bi-speedometer2"></i>
              <Image src="./exercise.png" width={30} height={30} />
              <span className="ms-2 text-dark">Exercises</span>
            </div>
          </li>
          <li
            className={`nav-item text-dark fs-4 my-1 ${
              selectedComponent === <RawFood /> ? "active" : ""
            }`}
            onClick={() => handleComponentClick(<RawFood />)}
          >
            <div className="nav-link" aria-current="page">
              <i className="bi bi-table"></i>
              <Image
                className="vh-15"
                src="./users.png"
                width={30}
                height={30}
              />
              <span className="ms-2 text-dark">Raw Foods</span>
            </div>
          </li>
          <li
              className={`nav-item text-dark fs-4 my-1 ${
                selectedComponent ===<CookedFood /> ? "active" : ""
            }`}
            style={{
              backgroundColor:
                selectedComponent === <CookedFood /> ? "#4F9FA0" : undefined,
            }}
            onClick={() => handleComponentClick(<CookedFood />)}
          >
            <div to="#" className="nav-link" aria-current="page">
              <i className="bi bi-table"></i>
              <Image
                className="vh-15"
                src="./plate.png"
                width={30}
                height={30}
              />
              <span className="ms-2 text-dark">Cooked Foods</span>
            </div>
          </li>
        </ul>
        <hr className="text-secondary" />
        <div className="mt-2">
          <a onClick={signout}
            className="nav-link text-white fs-4 d-flex align-items-center"
            style={{ marginLeft: 20, textDecoration: "none" }}
          >
            <i className="bi bi-box-arrow-left"></i>
            <Image className="vh-10" src="./logout-50.png" />
            <span className="mt-3 ms-2">Logout</span>
          </a>
        </div>
      </div>

      <div className="col-md-10" style={{ marginTop: 60 }}>
        {selectedComponent}
      </div>
    </div>
  );
}
