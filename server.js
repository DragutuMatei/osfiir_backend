import express, { json } from "express";
import fileUpload from "express-fileupload";
import { addBlogPost, getBlogPosts, getBlogPostById } from "./src/blog/blog";
const app = express();

app.use(fileUpload());
app.use(json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.post("/addBlogPost", addBlogPost);
app.get("/getBlogPosts", getBlogPosts);
app.get("/getBlogPostById/:id", getBlogPostById);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
