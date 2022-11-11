import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const registFromUrl = async (domain, fromUrl, navigate) => {
  try {
    let domainCheck;
    const httpIndex = fromUrl.indexOf("://");
    const domainIndex = fromUrl.indexOf("/", httpIndex + 3);
    if (domainIndex !== -1) {
      domainCheck = fromUrl.slice(httpIndex + 3, domainIndex);
    } else if (domainIndex === -1) {
      domainCheck = fromUrl.slice(httpIndex + 3);
    }
    await addDoc(collection(db, "tempAppointment"), {
      date: serverTimestamp(),
      fromUrl: domainCheck,
      domain: domain,
    });
  } catch (error) {
    console.log(error);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  // navigate(`/${domain}`);
  window.open(`https://mtg-non-apo.web.app/${domain}`, "_top");
};

export default registFromUrl;
