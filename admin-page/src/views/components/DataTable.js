import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { DataContext } from "../../contexts/DataContext";

const dataLabel = [
  "企業名",
  "メール",
  "住所",
  "月額利用料",
  "アカウント数",
  "サイト数",
  "契約期間",
  "ステータス",
  "操作",
];

const dateFormater = (year, month, duration) => {
  const endDate = new Date(year, month - 1 + duration, 1);
  return { year: endDate.getFullYear(), month: endDate.getMonth() + 1 };
};

const DataTable = (props) => {
  const { setNewOpen, setNewData } = props;
  const { dataList, searchValue } = useContext(DataContext);

  const [renderList, setRenderList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleEditButton = (data) => {
    setNewData(data);
    console.log(data);
    setNewOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "enterprise", id));
      const account_ref = await getDocs(
        query(collection(db, "account"), where("enterprise", "==", id))
      );
      account_ref.forEach((item) => {
        deleteDoc(doc(db, "account", item.id));
      });
    } catch {
      console.log("通信エラー");
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      console.log(searchValue);
      setRenderList(
        dataList.filter((item) => {
          return (
            new RegExp(searchValue).test(item.enterprise) ||
            new RegExp(searchValue).test(item.email) ||
            new RegExp(searchValue).test(item.address)
          );
        })
      );
    } else {
      setRenderList(dataList);
    }
  }, [dataList, searchValue]);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="data-table">
          <TableHead>
            <TableRow>
              {dataLabel.map((label) => {
                return <TableCell key={label}>{label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderList.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>{data.enterprise}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell sx={{ color: "#0B2869" }}>
                    {data.address}
                  </TableCell>
                  <TableCell sx={{ color: "#0B2869" }}>
                    {data.subscriptionCost}円
                  </TableCell>
                  <TableCell sx={{ color: "#0B2869" }}>
                    {data.numberOfAccount}
                  </TableCell>
                  <TableCell sx={{ color: "#0B2869" }}>
                    {data.numberOfSite}
                  </TableCell>
                  <TableCell sx={{ color: "#0B2869" }}>
                    {data.subscriptionDuration}ヶ月 <br />
                    {data.subscriptionStartYear}/{data.subscriptionStartMonth}～
                    {
                      dateFormater(
                        data.subscriptionStartYear,
                        data.subscriptionStartMonth,
                        data.subscriptionDuration
                      ).year
                    }
                    /
                    {
                      dateFormater(
                        data.subscriptionStartYear,
                        data.subscriptionStartMonth,
                        data.subscriptionDuration
                      ).month
                    }
                  </TableCell>
                  <TableCell>
                    {data.isAgreement ? "契約中" : "解約中"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditButton(data)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteId(data.id);
                        setDeleteModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteModal && (
        <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
          <DialogContent>本当に削除しますか？</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModal(false)}>キャンセル</Button>
            <Button onClick={() => handleDelete(deleteId)}>削除</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DataTable;
