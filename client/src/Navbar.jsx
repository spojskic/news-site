import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => {
            user ? history.push("/home") : history.push("/");
          }}
        >
          Home
        </span>
        <div>
          {user?.role === "admin" && (
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => {
                history.push("/home/add");
              }}
            >
              Add News
            </button>
          )}

          {!user ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                history.push("/");
              }}
            >
              Login
            </button>
          ) : (
            <button type="button" className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
