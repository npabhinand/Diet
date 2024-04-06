import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/auth_context";
import UserNav from "../components/UserNav";

export default function ExpertChat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const expertId = currentUser.uid;

  useEffect(() => {
    const getUsersData = async () => {
      const q = query(collection(db, "users"), where("role", "==", "user"));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    };

    getUsersData();
  }, []);

  useEffect(() => {
    if (selectedUser && expertId) {
      const getChatHistory = async () => {
        try {
          const q = query(
            collection(db, "chats"),
            where("expertId", "==", expertId),
            where("userId", "==", selectedUser.id),
            orderBy("timestamp"),
            limit(100)
          );
          const querySnapshot = await getDocs(q);
          const chatData = querySnapshot.docs.map((doc) => doc.data());
          setMessages(chatData);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      getChatHistory();
    }
  }, [selectedUser, expertId]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const sendMessage = async () => {
    try {
      if (selectedUser && expertId && messageText.trim() !== "") {
        // Proceed with sending the message
        const chatRef = collection(db, "chats");
        const timestamp = new Date();
        await addDoc(chatRef, {
          expertId: expertId,
          userId: selectedUser.id,
          message: messageText, // Ensure messageText is a string
          timestamp: timestamp,
          role: "expert", // Add the role field indicating the sender is an expert
        });
        // Update the messages state with the newly sent message
        setMessages([
          ...messages,
          {
            expertId: expertId,
            userId: selectedUser.id,
            message: messageText,
            timestamp: timestamp,
            role: "expert", // Add the role field indicating the sender is an expert
          },
        ]);
        // Clear the input field after sending the message
        setMessageText("");
      } else {
        console.error("Cannot send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <UserNav />
      <Container fluid className="py-5">
        <Row>
          <Col md="12">
            <Card id="chat3" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <Row>
                  <Col md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <div className="p-3">
                      <InputGroup className="mb-3 rounded">
                        <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <InputGroup.Text id="search-addon" className="border-0">
                          <i className="fas fa-search"></i>
                        </InputGroup.Text>
                      </InputGroup>
                      <div
                        style={{
                          position: "relative",
                          height: "400px",
                          overflowY: "auto",
                        }}
                      >
                        <ul className="list-unstyled mb-0">
                          {users.map((user) => (
                            <li
                              key={user.id}
                              className="p-2 border-bottom"
                              onClick={() => handleUserClick(user)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row">
                                  <div>
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                      alt="avatar"
                                      className="d-flex align-self-center me-3"
                                      width="60"
                                    />
                                    <span className="badge bg-success badge-dot"></span>
                                  </div>
                                  <div className="pt-1">
                                    <p className="fw-bold mb-0">{user.name}</p>
                                    <p className="small text-muted">
                                      Hello, Are you there?
                                    </p>
                                  </div>
                                </div>
                                <div className="pt-1">
                                  <p className="small text-muted mb-1">
                                    Just now
                                  </p>
                                  <span className="badge bg-danger rounded-pill float-end">
                                    3
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col md="6" lg="7" xl="8">
                    <div
                      style={{
                        position: "relative",
                        height: "400px",
                        overflowY: "auto",
                      }}
                      className="pt-3 pe-3"
                    >
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`d-flex flex-row justify-content-${
                            message.role === "expert" ? "end" : "start"
                          }`}
                        >
                          <div>
                            <p
                              className={`small p-2 ${
                                message.role === "expert" ? "me-3" : "ms-3"
                              } mb-1 ${
                                message.role === "expert"
                                  ? "rounded-3"
                                  : "rounded-3 text-white bg-primary"
                              }`}
                            >
                              {message.message}
                            </p>
                            <p
                              className={`small ${
                                message.role === "expert" ? "me-3" : "ms-3"
                              } mb-3 rounded-3 text-muted`}
                            >
                              {new Date(
                                message.timestamp.seconds * 1000
                              ).toLocaleTimeString()}{" "}
                              |{" "}
                              {new Date(
                                message.timestamp.seconds * 1000
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <FormControl
                        type="text"
                        id="messageInput"
                        placeholder="Type message"
                        className="form-control form-control-lg ms-1"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)} // Corrected onChange event
                      />
                      <Button className="ms-3" onClick={sendMessage}>
                        {" "}
                        {/* Corrected onClick event */}
                        Send
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
