import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();

  const signin = (username, password) => {
    if (
      username === process.env.REACT_APP_USER &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      setIsAuth(true);
      localStorage.setItem("isAuthAdmin", true);
    } else {
      setErrorLogin(true);
    }
  };
  const signout = () => {
    setIsAuth(false);
    localStorage.setItem("isAuthAdmin", false);
  };

  useEffect(() => {
    if (localStorage.getItem("isAuthAdmin")) {
      setIsAuth(localStorage.getItem("isAuthAdmin"));
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else if (!isAuth) {
      navigate("/signin");
    }
    // eslint-disable-next-line
  }, [isAuth]);

  // データ関係
  const [dataList, setDataList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    let q = query(collection(db, "enterprise"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataTemp = [];
      let temp = {};
      querySnapshot.forEach((doc) => {
        temp = doc.data();
        temp.id = doc.id;
        dataTemp.push(temp);
      });
      setDataList(dataTemp);
    });
    return () => unsubscribe();
  }, []);

  // Todo: 検索機能
  // const [afterSearchList, setAfterSearchList] = useState([]);
  // useEffect(() => {
  //   if (searchValue.length > 0) {
  //     // 正規表現に変数を使う時に必要なRegExp
  //     let seachValueRegExp = new RegExp(searchValue, "g");
  //     let searchedList = dataList.filter((item) => {
  //       return item.enterprise.match(seachValueRegExp);
  //     });
  //     setAfterSearchList(searchedList);
  //   } else {
  //     setAfterSearchList([]);
  //   }
  // }, [searchValue]);

  // Todo: 通信エラー時のスナックバー

  const value = {
    isAuth,
    signin,
    signout,
    dataList,
    setDataList,
    searchValue,
    setSearchValue,
    errorLogin,
    setErrorLogin,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
