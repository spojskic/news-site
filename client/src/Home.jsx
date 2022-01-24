import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import News from "./News";

const Home = () => {
  const [news, setNews] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/news");
        setNews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
      {news.map((n) => (
        <div key={n.id}>
          <News data={n} />
        </div>
      ))}
    </div>
  );
};

export default Home;
