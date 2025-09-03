import express, { json } from "express";
import fileUpload from "express-fileupload";
import {
  getBlogPosts,
  getById,
  getAnunturi,
  addPost,
  deleteById,
} from "./src/blog/blog";
import { getBobociByCNP } from "./src/cazari/cazari";
import { getVoluntariByMatricol } from "./src/voluntari/voluntari";

const app = express();

app.use(fileUpload());
app.use(json());

app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Origin", "https://osfiir.ro");
  res.setHeader("Access-Control-Allow-Origin", "https://osfiir-v2.netlify.app");
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

app.post("/", (req, res) => {
  res.status(200).json({ mes: "ce cauti aici?" });
});
app.post("/addPost", addPost);
app.get("/getBlogPosts/:cat", getBlogPosts);
app.get("/getAnunturi/:cat", getAnunturi);
app.get("/getById/:id", getById);
app.post("/deleteById", deleteById);

app.get("/getBobociByCNP/:cnp", getBobociByCNP);
app.get("/voluntari/:nr_matricol", getVoluntariByMatricol);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
