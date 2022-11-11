import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import availableChecker from "./availableChecker";
import { serverDomain } from "./mailSender";

const getInfo = async (
  domain,
  fromUrl,
  setFirstAccount,
  setOnline,
  setHaveSubbutton
) => {
  let firstAccountId = "";
  try {
    let domainCheck;
    const httpIndex = fromUrl.indexOf("://");
    const domainIndex = fromUrl.indexOf("/", httpIndex + 3);
    if (domainIndex !== -1) {
      domainCheck = fromUrl.slice(httpIndex + 3, domainIndex);
    } else if (domainIndex === -1) {
      domainCheck = fromUrl.slice(httpIndex + 3);
    }
    console.log(domainCheck);
    const docRef = await getDocs(
      query(
        collection(db, "site"),
        where("domain", "==", domain),
        where("userSite", "==", domainCheck),
        orderBy("created_at", "desc"),
        limit(1)
      )
    );
    console.log(docRef);
    let userIdList = [];
    let tempFirstId = "";
    docRef.forEach((element) => {
      userIdList.push(element.data().account);
      tempFirstId = element.data().isFirst;
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 表示するアカウントを選択
    firstAccountId = userIdList[0].filter((item) => {
      return item === tempFirstId;
    })[0];
    console.log(
      userIdList[0].filter((item) => {
        return item === tempFirstId;
      })[0]
    );
  } catch (error) {
    console.log(error);
  }

  let temp = {};
  try {
    const docRef2 = await getDoc(doc(db, "account", firstAccountId));
    temp = docRef2.data();
    temp.id = docRef2.id;
    // ボタンの取得
    let buttonTemp = [];
    if (docRef2.data().isOneSubButton === true) {
      const docRef3 = await getDocs(
        query(
          collection(db, "account", firstAccountId, "button"),
          where("isOnly", "==", true)
        )
      );
      docRef3.forEach((ele) => {
        buttonTemp.push(ele.data());
        if (ele.data().title === "") {
          setHaveSubbutton(false);
        } else {
          setHaveSubbutton(true);
        }
      });
    } else {
      const docRef4 = await getDocs(
        query(
          collection(db, "account", firstAccountId, "button"),
          where("isOnly", "==", false)
        )
      );
      docRef4.forEach((ele) => {
        buttonTemp.push(ele.data());
      });
    }
    temp.button = buttonTemp;
  } catch (error) {
    console.log(error);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  setFirstAccount(temp);
  // オンライン、オフラインの判定
  if (temp.isGoogleCalendar) {
    try {
      const result = await axios.get(
        `${serverDomain}/google?google=${temp.googleId}`
      );
      setOnline(result.data.isOnline);
    } catch (error) {
      console.log(error);
    }
  } else {
    availableChecker(temp, setOnline);
  }
};

export default getInfo;
