import { doc, query, where } from "firebase/firestore";
import { db } from "../../config_fire";

const getBobociByCNP = async (req, res) => {
  const { cnp } = req.params;
  try {
    const bobocRef = ref(db, "boboci");
    const q = query(bobocRef, where("cnp", "==", cnp));
    var querySnapshot = await getDocs(q);
    res
      .status(200)
      .json({ code: 200, data: { ...querySnapshot.docs[0].data() } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "CNP introdus gresit!" });
  }
};

export default { getBobociByCNP };
