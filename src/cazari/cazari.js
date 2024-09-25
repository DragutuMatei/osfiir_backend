// import { collection, doc, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../config_fire";
// import { ref } from "firebase/storage";

// const getBobociByCNP = async (req, res) => {
//   const cnp = req.params.cnp;
//   console.log(cnp);
//   try {
//     const bobocRef = collection(db, "boboci");
//     const q = query(bobocRef, where("cnp", "==", cnp));
//     var querySnapshot = await getDocs(q);
//     console.log(querySnapshot);
//     res
//       .status(200)
//       .json({ code: 200, data: { ...querySnapshot.docs[0].data() } });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ code: 500, message: "CNP introdus gresit!" });
//   }
// };

// export { getBobociByCNP };
import {
  getDatabase,
  ref,
  query,
  get,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../../config_fire"; // Make sure this is your Realtime Database reference

const getBobociByCNP = async (req, res) => {
  const cnp = req.params.cnp;
  console.log(cnp);

  try {
    // Reference to the 'boboci' node in Realtime Database
    const dbRef = getDatabase();
    const bobociRef = ref(dbRef, "boboci");

    // Query to filter based on CNP
    const q = query(bobociRef, orderByChild("cnp"), equalTo(cnp));

    // Fetch the data
    const querySnapshot = await get(q);

    // Check if the data exists
    if (querySnapshot.exists()) {
      // Extract the first matched document data
      const data = Object.values(querySnapshot.val())[0];
      console.log(data);

      // Return the result
      res.status(200).json({ code: 200, data });
    } else {
      res
        .status(404)
        .json({ code: 404, message: "No data found for the provided CNP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "CNP introdus gresit!" });
  }
};

export { getBobociByCNP };
