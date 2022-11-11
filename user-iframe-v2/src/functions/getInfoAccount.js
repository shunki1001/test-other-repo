import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const getInfoAccount = async (
  domain,
  index,
  setSelected,
  setAppointmentUrl,
  setSnsAccount
) => {
  let tempList = [];
  let enterpriseId = "";
  try {
    const docRef = await getDocs(
      query(collection(db, "enterprise"), where("domain", "==", domain))
    );
    docRef.forEach((element) => {
      enterpriseId = element.id;
      localStorage.setItem("id", element.id);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.log(error);
  }
  let tempName = "";
  let tempUrl = "";
  let tempAccount = {};
  try {
    const docRef2 = await getDocs(
      query(
        collection(db, "account"),
        where("enterprise", "==", enterpriseId),
        where("accountIndex", "==", Number(index))
      )
    );
    docRef2.forEach(async (element) => {
      tempAccount = element.data();
      tempName = element.data().username;
      tempUrl = element.data().url;
    });
  } catch (error) {
    console.log(error);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSnsAccount(tempAccount);
  setSelected(tempName);
  setAppointmentUrl(tempUrl);
};

export default getInfoAccount;
