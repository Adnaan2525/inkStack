const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const USERS = "users.json";
const POSTS = "posts.json";

// LOGIN
app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS));
  const user = users.find(u =>
    u.email === req.body.email &&
    u.password === req.body.password
  );

  res.json(user
    ? { success: true, message: "Login successful ✅" }
    : { success: false, message: "Invalid login ❌" }
  );
});

// SIGNUP
app.post("/signup", (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS));
  users.push(req.body);
  fs.writeFileSync(USERS, JSON.stringify(users));
  res.json({ message: "Signup successful 🎉" });
});

// CREATE POST
app.post("/post", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS));
  posts.push(req.body);
  fs.writeFileSync(POSTS, JSON.stringify(posts));
  res.json({ message: "Post saved" });
});

// GET POSTS
app.get("/posts/:email", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS));
  res.json(posts.filter(p => p.email === req.params.email));
});

app.listen(4000, () =>
  console.log("Server running at http://localhost:4000")
);
