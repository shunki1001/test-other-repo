import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const editData = async (newData, data) => {
  // newと言ってるけど編集前のデータ。dataが編集後のデータ
  const { id } = newData;
  const doc_ref = await updateDoc(doc(db, "enterprise", id), data);
  if (newData.numberOfAccount < data.numberOfAccount) {
    // アカウント数を増やした時
    for (let i = 0; i < data.numberOfAccount - newData.numberOfAccount; i++) {
      try {
        const docRef = await addDoc(collection(db, "account"), {
          username: `ユーザー${newData.numberOfAccount + i + 1}`,
          accountIndex: Number(newData.numberOfAccount + i + 1),
          email: "",
          phone: "",
          url: "",
          isGoogleCalendar: true,
          dayOfWeekChoices: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false,
          },
          startTime: "",
          endTime: "",
          company: data.enterprise,
          isOneSubButton: true,
          mainButton: "",
          subButtonTitle: "",
          googleId: "",
          mailSubject: "",
          mailContent: "",
          enterprise: id,
        });
        const userId = docRef.id;
        // button collection added
        for (let j = 0; j < 5; j++) {
          if (j === 0) {
            try {
              await addDoc(collection(db, "account", userId, "button"), {
                isOnly: true,
                title: "",
                url: "",
              });
            } catch (error) {
              console.log("アカウントのボタンコレクションでエラー");
              console.log(error);
            }
          } else {
            try {
              await addDoc(collection(db, "account", userId, "button"), {
                isOnly: false,
                title: "",
                url: "",
              });
            } catch (error) {
              console.log("アカウントのボタンコレクションでエラー");
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log("アカウントの登録でエラー");
        console.log(error);
      }
    }
  } else if (newData.numberOfAccount > data.numberOfAccount) {
    // アカウント数を減らした時
    const q = query(collection(db, "account"), where("enterprise", "==", id));
    const result = await getDocs(q);
    let accountList = [];
    let temp;
    result.forEach((doc) => {
      temp = doc.data();
      temp.id = doc.id;
      accountList.push(temp);
    });
    for (let i = 0; i < newData.numberOfAccount - data.numberOfAccount; i++) {
      const deleteAccount = accountList.filter((item) => {
        return item.accountIndex === newData.numberOfAccount - i;
      })[0];
      await deleteDoc(doc(db, "account", deleteAccount.id));
    }
  }
  return doc_ref;
};

export default editData;
