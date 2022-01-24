import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const user = await axios.post("http://localhost:8081/user/login", data);
      if (user.data.status === "aktivan") {
        localStorage.setItem("user", JSON.stringify(user.data));
        history.push("/home");
      } else {
        alert(
          "You are not active user! Please contact admin to make you an active user."
        );
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3">
              <div className="card-body p-4 p-sm-5">
                <img
                  src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  style={{ width: "100%" }}
                  alt=""
                />
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={submitForm}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-grid mb-1">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="d-grid mb-1">
                    <button
                      className="btn btn-secondary btn-login text-uppercase fw-bold"
                      onClick={() => history.push("/register")}
                    >
                      Go to Registration
                    </button>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-outline-secondary btn-login text-uppercase fw-bold"
                      onClick={() => {
                        const guest = {
                          status: "neaktivan",
                          role: "guest",
                        };
                        localStorage.setItem("user", JSON.stringify(guest));
                        history.push("/home");
                      }}
                    >
                      Continue as guest
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
