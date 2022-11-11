import React from "react";
import { createContext, useState, useEffect } from "react";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const DataContext2 = createContext();

const DataContext2Provider = (props) => {
  const [domain, setDomain] = useState("");
  const [accountIndex, setAccountIndex] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [fromUrl, setFromUrl] = useState("");
  const [firstId, setFirstId] = useState("");
  const [firstAccount, setFirstAccount] = useState({});

  let urlList = [];
  let tempFirstId = "";

  useEffect(() => {
    if (accountIndex !== "") {
      console.log("SNSからの流入!");
    } else {
      console.log("iframeからの流入!");
    }
  }, [accountIndex]);

  const getSiteInfo = async (domainName) => {
    // siteコレクションからアカウントリスト取得
    // accountコレクションから各アカウント情報、各ボタン情報取得

    try {
      const docRef = await getDocs(
        collection(db, "site"),
        where("domain", "==", domainName)
      );
      let userIdList = [];
      let userSite = "";
      docRef.forEach((element) => {
        userIdList.push(element.data().account);
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(userIdList);
      let tempList = [];

      // Todo: 遷移元ページによって下の[0]を変更する。

      userIdList[0].forEach(async (accountElement) => {
        let temp = {};
        try {
          const docRef2 = await getDoc(doc(db, "account", accountElement));
          temp = docRef2.data();
          temp.id = docRef2.id;
          // ボタンの取得
          let buttonTemp = [];
          if (docRef2.data().isOneSubButton === true) {
            const docRef3 = await getDocs(
              query(
                collection(db, "account", accountElement, "button"),
                where("isOnly", "==", true)
              )
            );
            docRef3.forEach((ele) => {
              buttonTemp.push(ele.data());
            });
          } else {
            const docRef4 = await getDocs(
              query(
                collection(db, "account", accountElement, "button"),
                where("isOnly", "==", false)
              )
            );
            docRef4.forEach((ele) => {
              buttonTemp.push(ele.data());
            });
          }
          temp.button = buttonTemp;
          tempList.push(temp);
        } catch (error) {
          console.log(error);
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAccountList(tempList);
      console.log(tempList);
    } catch (error) {
      console.log(error);
      alert("登録されていないサイトからの流入です");
    }
    try {
      const docRef = await getDocs(
        collection(db, "enterprise"),
        where("site", "==", fromUrl)
      );
      docRef.forEach((element) => {
        urlList = element.data().site;
        tempFirstId = element.data().isFirst;
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFirstId(tempFirstId);
      console.log(fromUrl);
    } catch (error) {
      console.log(error);
      alert("登録されたサイト以外からの遷移です");
    }
  };

  const urlInList = () => {
    // ドメインでチェック？サイト名でチェック？
    const fromDomain = fromUrl.indexOf("/", 8);
    console.log(fromUrl.substring(0, fromDomain));
    console.log(urlList);
    const checked = urlList.indexOf(fromUrl);
    return checked !== -1;
  };

  useEffect(() => {
    console.log(domain);
    if (domain.length > 0) {
      getSiteInfo(domain);
      // if (urlInList()) {
      //   console.log("登録されたURLからの遷移です");
      // } else {
      //   alert("登録されたURL以外からの遷移です");
      //   // window.location.href = 'https://non-appoint.com'
      // }
    }
  }, [domain]);

  useEffect(() => {
    setFirstAccount(
      accountList.filter((item) => {
        return item.id === firstId;
      })[0]
    );
  }, [firstId, accountList]);
  useEffect(() => {
    console.log(firstAccount);
  }, [firstAccount]);

  const value = {
    domain,
    setDomain,
    accountList,
    setFromUrl,
    firstAccount,
    accountIndex,
    setAccountIndex,
  };

  return (
    <DataContext2.Provider value={value}>
      {props.children}
    </DataContext2.Provider>
  );
};

export default DataContext2Provider;
