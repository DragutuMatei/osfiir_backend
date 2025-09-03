import {
  getDatabase,
  ref,
  query,
  get,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database } from "../../config_fire";

const getVoluntariByMatricol = async (req, res) => {
  let nrMatricol = req.params.nr_matricol;
    nrMatricol = nrMatricol.replaceAll("-", "/");

  try {
    const voluntariRef = ref(database, "voluntari");
    const q = query(
      voluntariRef,
      orderByChild("nr_matricol"),
      equalTo(nrMatricol)
    );
    const snapshot = await get(q);
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send("Nu s-a găsit voluntarul");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Eroare la query");
  }
};

export {getVoluntariByMatricol};