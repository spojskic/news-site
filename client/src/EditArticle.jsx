import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: "",
    description: "",
  });

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:8081/news/${id}`);

        setFormData({
          ...formData,
          title: response.data[0].title,
          imageURL: response.data[0].imageURL,
          description: response.data[0].description,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8081/news/${id}`, formData);
    history.push("/home");
  };

  return (
    <div className="container w-50 mt-5">
      <form onSubmit={submitForm}>
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <label className="form-label" htmlFor="form5Example1">
            Title
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            value={formData.imageURL}
            onChange={(e) =>
              setFormData({ ...formData, imageURL: e.target.value })
            }
          />
          <label className="form-label" htmlFor="form5Example2">
            Image URL
          </label>
        </div>

        <div className="form-outline mb-4">
          <textarea
            type="text"
            className="form-control"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <label className="form-label" htmlFor="form5Example2">
            Description
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
