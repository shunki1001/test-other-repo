import { MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const AccountSelect = () => {
  const { account, setAccount, accountList } = useContext(DataContext);

  const [renderFlag, setRenderFlag] = useState(false);

  const [renderList, setRenderList] = useState([]);
  const [renderAccount, setRenderAccount] = useState("");

  useEffect(() => {
    if (accountList.length > 0) {
      setRenderFlag(true);
      setRenderList(accountList);
    } else {
      setRenderFlag(false);
    }
  }, [accountList]);
  useEffect(() => {
    if (accountList.length > 0) {
      if (renderAccount !== "") {
        setRenderAccount(
          accountList.filter((item) => {
            return item.id === localStorage.getItem("userId");
          })[0].username
        );
      } else {
        // 初回レンダリング用
        setRenderAccount(accountList[0].username);
        setAccount(accountList[0].username);
      }
    }
  }, [renderList]);

  useEffect(() => {
    setAccount(renderAccount);
  }, [renderAccount]);

  return (
    <>
      {renderFlag == true && (
        <Select
          labelId="site-select-label"
          id="site-select"
          value={renderAccount}
          label="アカウント名"
          sx={{
            "& .MuiSelect-select": {
              backgroundColor: "white",
              maxWidth: "6em",
              py: 1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          onChange={(e, index) => {
            if (accountList.length > 0) {
              setRenderAccount(e.target.value);
            }
            const targetuser = accountList.filter(
              (item) => item.username === e.target.value
            );
            localStorage.setItem("userId", targetuser[0].id);
          }}
        >
          {renderList.map((item) => (
            <MenuItem value={item.username} key={item.id}>
              {item.username}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default AccountSelect;
