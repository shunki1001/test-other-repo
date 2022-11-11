import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const registSiteTag = async (
  issueAccountList,
  userSite,
  setErrorSnackOpen,
  domain,
  isFirstId
) => {
  try {
    await addDoc(collection(db, "site"), {
      account: issueAccountList.map((item) => item.id),
      userSite: userSite,
      domain: domain,
      isFirst: isFirstId,
      created_at: serverTimestamp(),
    });
    return true;
  } catch (error) {
    setErrorSnackOpen({
      open: true,
      message: "商談タグの発行に失敗。更新してやり直してください。",
    });
    console.log(error);
    return false;
  }
};

export default registSiteTag;
