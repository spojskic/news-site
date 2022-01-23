import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "dbinfo_122",
});

export const getNews = async (req, res) => {
  connection.query("SELECT * FROM news", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.status(200).send(data);
  });
};

export const getOneArticle = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM news WHERE news.id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).send(data);
    }
  );
};

export const postNews = async (req, res) => {
  if (!req.body) {
    return;
  }
  const title = req.body.title;
  const description = req.body.description;
  const imageURL = req.body.imageURL;

  connection.query(
    "INSERT INTO news(title,description,imageURL) VALUES(?,?,?)",
    [title, description, imageURL],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "News Created!" });
    }
  );
};

export const getComments = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT comments.id, comments.comment, users.username FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.newsId = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).send(data);
    }
  );
};

export const postComment = async (req, res) => {
  if (!req.body) {
    return;
  }
  const comment = req.body.comment;
  const newsId = req.body.newsId;
  const userId = req.body.userId;

  connection.query(
    "INSERT INTO comments(comment, newsId, userId) VALUES(?,?,?)",
    [comment, newsId, userId],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Comment Added!" });
    }
  );
};
