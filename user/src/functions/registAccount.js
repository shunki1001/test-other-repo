import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

const registAccount = async (
  hookData,
  isFirst,
  isGoogleCalendar,
  dayOfWeekChoices,
  startTime,
  endTime,
  isOneSubButton,
  googleId,
  mailSubject,
  mailContent,
  avatar,
  setAvatarLink,
  thumbnail,
  setThumbnailLink,
  subButtonList,
  subButtonTitle,
  setErrorSnackOpen,
  setAvatar,
  setThumbnail,
  setSaveClick
) => {
  const docRef2 = doc(db, "account", localStorage.getItem("userId"));
  try {
    await updateDoc(docRef2, {
      username: hookData.username,
      email: hookData.email,
      phone: hookData.phone,
      url: hookData.url,
      isGoogleCalendar: isGoogleCalendar,
      dayOfWeekChoices: dayOfWeekChoices,
      startTime: startTime,
      endTime: endTime,
      company: hookData.company,
      isOneSubButton: isOneSubButton,
      mainButton: hookData.mainButton,
      googleId: googleId,
      mailSubject: mailSubject,
      mailContent: mailContent.replace(/\r?\n/g, "<br>"),
      subButtonTitle: subButtonTitle,
      // 1回でも登録されたか
      alreadyRegist: true,
    });
    setErrorSnackOpen({
      open: true,
      message: "更新しました",
    });
  } catch (error) {
    console.log(error);
    setErrorSnackOpen({ open: true, message: "ユーザーの更新に失敗しました" });
    return false;
  }

  subButtonList.forEach(async (item) => {
    try {
      await updateDoc(
        doc(db, "account", localStorage.getItem("userId"), "button", item.id),
        {
          title: item.title,
          url: item.url,
        }
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // try {
  //   multiSubButton.forEach(async (element) => {
  //     await updateDoc(doc(db, "multibutton", element.id), {
  //       title: element.title,
  //       url: element.url,
  //     });
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  const docId = localStorage.getItem("id");
  const docRef = doc(db, "enterprise", docId);

  if (isFirst === true) {
    try {
      await updateDoc(docRef, {
        isFirst: localStorage.getItem("userId"),
      });
    } catch (error) {
      console.log(error);
      setErrorSnackOpen({
        open: true,
        message: "ユーザーの先頭配置の設定に失敗しました",
      });
      return false;
    }
  }

  if (avatar !== null) {
    const storageRef = ref(storage, `avatar/${localStorage.getItem("userId")}`);

    const uploadTask1 = uploadBytesResumable(storageRef, avatar);
    uploadTask1.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setErrorSnackOpen({
          open: true,
          message: "画像の更新に失敗しました",
        });
        return false;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask1.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateDoc(docRef2, {
            avatar: downloadURL,
          });
          setAvatarLink(downloadURL);
        });
      }
    );
  }
  if (thumbnail !== null) {
    const storageRef2 = ref(
      storage,
      `thumbnail/${localStorage.getItem("userId")}`
    );
    const uploadTask2 = uploadBytesResumable(storageRef2, thumbnail);
    uploadTask2.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setErrorSnackOpen({
          open: true,
          message: "画像の更新に失敗しました",
        });
        return false;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateDoc(docRef2, {
            thumbnail: downloadURL,
          });
          setThumbnailLink(downloadURL);
        });
      }
    );
  }
  setAvatar(null);
  setThumbnail(null);
  setSaveClick(true);
  return true;
};

export default registAccount;
