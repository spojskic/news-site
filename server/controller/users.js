import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "dbinfo_122",
});

export const registerUser = async (req, res) => {
  if (!req.body) {
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

  await connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        return;
      }
      if (result.length != 0) {
        console.log("User already exists");
        res.send(409);
      } else {
        await connection.query(
          "INSERT INTO users(username, password, role ,status) VALUES(?, ?, 'user', 'neaktivan')",
          [username, password],
          (err, data, fields) => {
            if (err) {
              console.log(err);
              return;
            }
            res
              .status(201)
              .json({ status: "success", message: "User Created!" });
          }
        );
      }
    }
  );
};

export const loginUser = async (req, res) => {
  if (!req.body) {
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

  await connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (data[0].username === username && data[0].password === password) {
        res.send(data[0]);
      } else {
        res.sendStatus(404);
      }
    }
  );
};
