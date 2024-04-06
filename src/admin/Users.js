import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };

    getUserData();
  }, []);

  return (
    <div>
      <Table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            {/* <th>BMI</th> */}
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{user.name}</p>
                    <p class="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">{user.role}</p>
                {/* <p class="text-muted mb-0">{user.department}</p> */}
              </td>
              <td>
              <td>{user.phone}</td>
              </td>
              {/* <td> {user.BMI}</td>
              <td>
                <button type="button" class="btn btn-link btn-sm btn-rounded">
                 
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
