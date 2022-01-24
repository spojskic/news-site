import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8081/user");
      setUsers(response.data);
    })();
  }, []);

  return (
    <div className="d-flex">
      <ul className="list-group mx-auto mt-5">
        {users.map((user) =>
          user.username === "admin" ? (
            <div key={user.id}></div>
          ) : (
            <li
              className="list-group-item  p-3 d-flex justify-content-between align-items-center"
              key={user.id}
            >
              <b>Username:</b> {user.username} - <b>Role:</b> {user.role} -
              <b>Status:</b>
              {user.status}
              <button
                className="btn btn-outline-primary mx-3"
                onClick={async () => {
                  await axios.get(
                    `http://localhost:8081/user/status/${user.id}`
                  );
                  history.go(0);
                }}
              >
                Change Status
              </button>
              <p
                className="mt-3"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await axios.delete(`http://localhost:8081/user/${user.id}`);
                  history.go(0);
                }}
              >
                &#10060;
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListUsers;
