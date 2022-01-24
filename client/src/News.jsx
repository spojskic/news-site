import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const News = ({ data }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const deleteNews = async () => {
    await axios.delete(`http://localhost:8081/news/${data.id}`);
    history.go(0);
  };

  return (
    <div className="col">
      <div className="card">
        <img
          src={data.imageURL}
          className="card-img-top"
          style={{ height: "280px", cursor: "pointer" }}
          alt="..."
          onClick={() => history.push(`home/${data.id}`)}
        />
        <div className="card-body">
          <h4 className="card-title">{data.title}</h4>
          <div className="mt-2 d-flex flex-row justify-content-between">
            {user.role === "admin" ? (
              <>
                <button
                  className="btn btn-outline-primary buttons"
                  onClick={() => {
                    history.push(`/home/edit/${data.id}`);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-outline-danger" onClick={deleteNews}>
                  Delete
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
