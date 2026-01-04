import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Router has the same properties with routing as app
const router = express.Router();

// You can connect the app with the router to get the routers routes
app.get("/", router);

router.get("/about", (req, res) => {
  res.send("Hello About");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
