const API = "http://localhost:4000";

// LOGIN
async function login() {
  const email = emailInput().value;
  const password = passwordInput().value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;

  if (data.success) {
    localStorage.setItem("email", email);
    window.location = "dashboard.html";
  }
}

// SIGNUP
async function signup() {
  const email = emailInput().value;
  const password = passwordInput().value;

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
}

// CREATE POST
async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const email = localStorage.getItem("email");

  await fetch(API + "/post", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ title, content, email })
  });

  loadPosts();
}

// LOAD POSTS
async function loadPosts() {
  const email = localStorage.getItem("email");
  const res = await fetch(API + "/posts/" + email);
  const posts = await res.json();

  document.getElementById("posts").innerHTML =
    posts.map(p => `<p><b>${p.title}</b><br>${p.content}</p>`).join("");
}

function logout() {
  localStorage.clear();
  window.location = "index.html";
}

function emailInput(){ return document.getElementById("email"); }
function passwordInput(){ return document.getElementById("password"); }

if (location.pathname.includes("dashboard")) {
  loadPosts();
}
