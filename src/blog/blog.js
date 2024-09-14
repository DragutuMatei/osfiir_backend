import { db, storage } from "../../config_fire";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const addBlogPost = async (req, res) => {
  const data = req.body;
  // console.log(data.title, req.files["cover"].name, req.files["cover"].data);
  data["sections"] = JSON.parse(data["sections"]);
  data["timestamp"] = Timestamp.now().seconds;

  try {
    const storageRef = ref(storage, `/blog/${req.files["cover"].name}`);
    await uploadBytes(
      storageRef,
      req.files["cover"].data
      // reader/
    );

    const url = await getDownloadURL(storageRef);

    data["cover"] = url;
    data["imgs"] = [];
    for (let i = 0; i < req.files["imgs[]"].length; i++) {
      const storageRef = ref(storage, `/blog/${req.files["imgs[]"][i].name}`);

      await uploadBytes(storageRef, req.files["imgs[]"][i].data);

      const url = await getDownloadURL(storageRef);

      data["imgs"][i] = url;
    }

    console.log(req.files);
    data["galerie"] = [];
    for (let i = 0; i < req.files["galerie[]"].length; i++) {
      const storageRef = ref(
        storage,
        `/blog/${req.files["galerie[]"][i].name}`
      );

      await uploadBytes(storageRef, req.files["galerie[]"][i].data);

      const url = await getDownloadURL(storageRef);

      data["galerie"][i] = url;
    }

    console.log(data.sections[0].texts);

    await addDoc(collection(db, "blog"), data);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error });
  }
};

const getBlogPosts = async (req, res) => {
  const data = [];
  try {
    const blog_posts = await getDocs(collection(db, "blog"));
    blog_posts.forEach((doc) => {
      data.push({ uid: doc.id, ...doc.data() });
    });
    res.status(200).json({ ok: true, data });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};
const getBlogPostById = async (req, res) => {
  try {
    const ref = doc(db, "blog", req.params.id);
    const blog_post = await getDoc(ref);
    res.status(200).json({
      ok: true,
      data: { uid: blog_post.id, ...blog_post.data() },
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ ok: false, error });
  }
};
export { addBlogPost, getBlogPosts, getBlogPostById };
