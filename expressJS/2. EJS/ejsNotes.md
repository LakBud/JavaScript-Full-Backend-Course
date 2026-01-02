# EJS Templating in Express.js

EJS (Embedded JavaScript) is a templating engine used in Express.js to render HTML pages dynamically. It allows embedding JavaScript logic directly into HTML templates.

This note includes syntax and patterns used in production applications.

---

## Core Concepts (Always Used)

### Installing and Setting Up EJS

Install via npm:

npm install ejs

Set EJS as the view engine:

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", \_\_dirname + "/views");

---

### Rendering Templates

The res.render() method renders an EJS template.

app.get("/", (req, res) => {
res.render("index", { title: "Home Page" });
});

- "index" is the template name (index.ejs in /views)
- The object provides variables for the template

---

### Passing Data to Templates

EJS templates can access variables passed in res.render():

app.get("/users/:id", (req, res) => {
const user = { id: req.params.id, name: "Alice" };
res.render("user", { user });
});

In user.ejs:

<h1>User: <%= user.name %></h1>
<p>ID: <%= user.id %></p>

---

### EJS Syntax (Always Used)

- `<%= variable %>` → Outputs escaped content
- `<%- variable %>` → Outputs unescaped content (e.g., HTML)
- `<% code %>` → Executes JavaScript code without output
- `<% if(condition) { %> ... <% } %>` → Conditional rendering
- `<% for(let i=0; i<items.length; i++) { %> ... <% } %>` → Loops

---

### Partials / Includes (Always Used in Production)

Partials allow reuse of template code.

In header.ejs:

<header>
  <h1><%= title %></h1>
</header>

Include in index.ejs:

<%- include("header") %>

---

### Layouts (Sometimes Used)

Layouts provide a consistent wrapper for multiple pages.

Example using EJS include:

<!-- layout.ejs -->
<html>
<head><title><%= title %></title></head>
<body>
  <%- include("header") %>
  <%- body %>
  <%- include("footer") %>
</body>
</html>

Render page with layout:

app.get("/about", (req, res) => {
res.render("about", { title: "About Page" });
});

---

### Conditional Rendering (Sometimes Used)

<% if(user) { %>

  <p>Welcome, <%= user.name %></p>
<% } else { %>
  <p>Please log in</p>
<% } %>

---

### Looping Through Data (Sometimes Used)

<ul>
<% users.forEach(user => { %>
  <li><%= user.name %></li>
<% }) %>
</ul>

---

### Escaping vs Unescaped Content

- Use `<%= %>` for safe output
- Use `<%- %>` when you want raw HTML

Example:

<%- "<b>Bold</b>" %> renders as bold text
<%= "<b>Bold</b>" %> renders as &lt;b&gt;Bold&lt;/b&gt;

---

### Passing Multiple Variables

app.get("/dashboard", (req, res) => {
const data = { user: req.user, stats: [1,2,3] };
res.render("dashboard", data);
});

In dashboard.ejs:

<h1>Welcome, <%= user.name %></h1>
<ul>
<% stats.forEach(num => { %>
  <li><%= num %></li>
<% }) %>
</ul>

---

### Partial Loops (Sometimes Used)

<% users.forEach(user => { %>
<%- include("user-card", { user }) %>
<% }) %>

- user-card.ejs can contain repeated HTML structure

---

## Summary

EJS in production:

- Uses res.render() to generate HTML
- Passes variables from Express to templates
- Supports loops, conditionals, and includes
- Separates partials and layouts for maintainability
- Escapes output by default but allows raw HTML when needed
