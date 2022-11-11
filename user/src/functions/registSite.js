import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const registSite = async (userSiteList) => {
  const docId = localStorage.getItem("id");
  const docRef = doc(db, "enterprise", docId);
  const updated = await updateDoc(docRef, {
    site: userSiteList,
  });
  return updated;
};

export default registSite;
