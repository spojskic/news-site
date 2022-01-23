import { useHistory } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    history.go(0);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        {!user ? (
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Login
          </button>
        ) : (
          <button type="button" class="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
