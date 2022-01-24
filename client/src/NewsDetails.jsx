import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const NewsDetails = () => {
  const [news, setNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState("");

  const { id } = useParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/news/${id}`);
        setNews(response.data[0]);

        const com = await axios.get(
          `http://localhost:8081/news/comments/${id}`
        );
        setComments(com.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const postComment = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      comment: formData,
      userId: user.id,
      newsId: id,
    };

    await axios.post(`http://localhost:8081/news/comments`, data);

    const com = await axios.get(`http://localhost:8081/news/comments/${id}`);
    setComments(com.data);

    setFormData("");
  };

  return (
    <div className="container">
      <h1 className="my-4">
        {news.title} <br></br>
      </h1>

      <div className="row">
        <div className="col-md-8">
          <img className="img-fluid" src={news.imageURL} alt="" />
        </div>

        <div className="col-md-4">
          <h3 className="my-3">News sumary</h3>
          <p>{news.description}</p>

          {user.role === "user" ? (
            <form onSubmit={postComment}>
              <input
                type="text"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Add Comment"
              />
              <button className="btn btn-secondary" type="submit">
                Submit Comment
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="row mt-5 w-50">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id}>
            {user.role === "admin" ? (
              <p
                className="btn"
                style={{ paddingTop: "18px" }}
                onClick={async () => {
                  await axios.delete(
                    `http://localhost:8081/news/comments/${comment.id}`
                  );
                  const com = await axios.get(
                    `http://localhost:8081/news/comments/${id}`
                  );
                  setComments(com.data);
                }}
              >
                &#10060;
              </p>
            ) : (
              <></>
            )}
            <b>{comment.username}:</b> {comment.comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;
