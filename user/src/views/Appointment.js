import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import { DataGrid, GridCellModes, GridToolbarExport } from "@mui/x-data-grid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DataContext } from "../contexts/DataContext";
import { jaJP } from "../styles/customJaJp";

import clsx from "clsx";

const theme = createTheme({}, jaJP);

const stateString = ["商談済み", "成約", "検討中", "商談依頼あり"];
const columns = [
  { field: "date", headerName: "商談日", flex: 1, minwidth: 50 },
  {
    field: "enterprise",
    headerName: "会社名",
    sortable: false,
    flex: 1,
    minwidth: 100,
  },
  {
    field: "name",
    headerName: "担当者名",
    sortable: false,
    flex: 0.75,
    minwidth: 50,
  },
  {
    field: "phone",
    headerName: "電話番号",
    sortable: false,
    width: 150,
  },
  {
    field: "email",
    headerName: "Eメール",
    sortable: false,
    flex: 1,
    minwidth: 50,
  },
  {
    field: "address",
    headerName: "住所",
    sortable: false,
    flex: 1,
    minwidth: 50,
  },
  {
    field: "fromUrl",
    headerName: "流入サイト",
    sortable: false,
    flex: 1,
    editable: false,
    minwidth: 50,
    renderCell: (cellValues) => {
      return (
        <>
          {cellValues.value.url}
          <br />
          {cellValues.value.title}
        </>
      );
    },
  },
  {
    field: "state",
    headerName: "状態",
    sortable: false,
    type: "singleSelect",
    valueOptions: stateString,
    editable: true,
    flex: 0.75,
    minwidth: 50,
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }
      return clsx("cell-state", {
        state1: params.value === stateString[0],
        state2: params.value === stateString[1],
        state3: params.value === stateString[2],
        state4: params.value === stateString[3],
      });
    },
  },
  {
    field: "concierge",
    headerName: "商談対応者",
    sortable: false,
    editable: false,
    filterable: false,
    flex: 1,
    minwidth: 50,
  },
];

const Appointment = () => {
  const { enterprise, setNewNotice, dataList, setDataList } =
    useContext(DataContext);

  const rows = dataList.map((item) => {
    let todayTimestamp = new Date(item.date.seconds * 1000);
    return {
      id: item.id,
      date: `${todayTimestamp.getYear() + 2000 - 100}/${
        todayTimestamp.getMonth() + 1
      }/${todayTimestamp.getDate()} ${todayTimestamp.getHours()}:${todayTimestamp.getMinutes()}`,
      enterprise: item.enterprise,
      name: item.name,
      phone: item.phone,
      email: item.email,
      address: item.address,
      fromUrl: { title: item.title, url: item.fromUrl },
      state: stateString[item.state - 1],
      concierge: item.concierge,
    };
  });

  // Update
  const processRowUpdate = async (newRow, oldRow) => {
    // console.log(newRow);
    // console.log(oldRow);
    const updateData = {
      state: stateString.indexOf(newRow.state) + 1,
      concierge: newRow.concierge,
    };
    await updateDoc(doc(db, "appointment", newRow.id), updateData);
    return { ...newRow };
  };

  useEffect(() => {
    const q = query(
      collection(db, "appointment"),
      where("enterpriseId", "==", localStorage.getItem("id"))
    );
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
  }, [enterprise]);

  useEffect(() => {
    try {
      dataList.forEach((item) => {
        updateDoc(doc(db, "appointment", item.id), {
          isChecked: true,
        });
      });
      setNewNotice(false);
    } catch (error) {
      console.log(error);
    }
  }, [dataList]);

  // セルをクリックで編集できるようにするコード
  const [cellModesModel, setCellModesModel] = useState({});

  const handleCellClick = React.useCallback((params) => {
    if (params.field === "state") {
      setCellModesModel((prevModel) => {
        return {
          // Revert the mode of the other cells from other rows
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {}
              ),
            }),
            {}
          ),
          [params.id]: {
            // Revert the mode of other cells in the same row
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({
                ...acc,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),

            [params.field]: { mode: GridCellModes.Edit },
          },
        };
      });
    }
  }, []);

  const handleCellModesModelChange = React.useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  return (
    <HomeLayout title="アポイント管理">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "78vh",
            width: "100%",
            maxWidth: "100%",
            borderRadius: "4px",
            bgcolor: "#ffffff",
            boxShadow: "rgb(137 137 137 / 16%) 0px 4px 5px 0px",
            "& .cell-state.state1 div": {
              color: "#2D92FE",
              background: "#E8FDFF",
              padding: "1px 0.5em",
              borderRadius: "10px",
              cursor: "pointer",
            },
            "& .cell-state.state2 div": {
              color: "#1DBC9C",
              background: "#D9FEC7",
              padding: "1px 0.5em",
              borderRadius: "10px",
              cursor: "pointer",
            },
            "& .cell-state.state3 div": {
              color: "#C97F00",
              background: "#FFF5A5",
              padding: "1px 0.5em",
              borderRadius: "10px",
              cursor: "pointer",
            },
            "& .cell-state.state4 div": {
              color: "#fff",
              background: "#FF5555",
              padding: "1px 0.5em",
              borderRadius: "10px",
              cursor: "pointer",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            rowHeight={80}
            cellModesModel={cellModesModel}
            onCellModesModelChange={handleCellModesModelChange}
            onCellClick={handleCellClick}
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
            }}
            processRowUpdate={(newRow, oldRow) =>
              processRowUpdate(newRow, oldRow)
            }
            onProcessRowUpdateError={(error) => console.log(error)}
            sx={{
              border: "none",
              py: 1,
              px: "2%",
              color: "#000000",
              "& .MuiDataGrid-menuIcon": {
                display: "none",
              },
              "& .MuiDataGrid-columnHeader:nth-child(8) .MuiDataGrid-menuIcon":
                {
                  display: "flex",
                },
              "& .MuiDataGrid-columnHeaders": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeader:focus-within": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 700,
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-cell": {
                border: "none",
                fontSize: "0.765rem",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "& .MuiDataGrid-cell.MuiDataGrid-cell--editing .Mui-focused": {
                fontSize: "0.765rem",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "0",
              },
              "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
                {
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "auto",
                },
              // "& .MuiDataGrid-cell:nth-child(1)": { width: "50%" },
              "& .MuiDataGrid-row": {
                border: "1px solid #B1B1B1",
                borderRadius: "5px",
                width: "98%",
                my: 1,
              },
            }}
            components={{
              Toolbar: CustomToolbar,
              ColumnSortedDescendingIcon: ArrowDropUpIcon,
              ColumnSortedAscendingIcon: ArrowDropDownIcon,
            }}
          />
        </Box>
      </ThemeProvider>
    </HomeLayout>
  );
};
function CustomToolbar() {
  return (
    <Box sx={{ textAlign: "right", width: "100%" }}>
      <GridToolbarExport
        csvOptions={{ utf8WithBom: true }}
        startIcon=""
        variant="outlined"
      />
    </Box>
  );
}

export default Appointment;
