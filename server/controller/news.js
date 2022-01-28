import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "dbinfo_122",
});

export const getNews = async (req, res) => {
  await connection.query("SELECT * FROM news", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.status(200).send(data);
  });
};

export const getOneArticle = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }
  await connection.query(
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

  await connection.query(
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

export const deleteNews = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }

  await connection.query(
    "DELETE FROM comments WHERE newsId = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );

  await connection.query(
    "DELETE FROM news WHERE id = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ status: "success", message: "News Deleted" });
    }
  );
};

export const updateNews = async (req, res) => {
  if (!req.body) {
    return;
  }
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;

  await connection.query(
    "UPDATE news SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "News Updated!" });
    }
  );
};

export const getComments = async (req, res) => {
  const id = req.params.id;
  await connection.query(
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

  await connection.query(
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

export const deleteComment = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return;
  }

  await connection.query(
    "DELETE FROM comments WHERE id = ?",
    [parseInt(id)],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json({ status: "success", message: "Comment Deleted" });
    }
  );
};
