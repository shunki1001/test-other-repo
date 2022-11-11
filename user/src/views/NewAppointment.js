import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import {
  Box,
  IconButton,
  Popover,
  ButtonGroup,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import styles from "./css/table.module.css";
import { DataContext } from "../contexts/DataContext";
import clsx from "clsx";
import { CSVLink } from "react-csv";

import "./css/custom-table.css";

import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const stateString = ["商談済み", "成約", "検討中", "商談依頼あり"];
const columns = [
  {
    accessor: "date",
    Header: "商談日",
    disableFilters: true,
    sortDescFirst: true,
  },
  {
    accessor: "enterprise",
    Header: "会社名",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    accessor: "name",
    Header: "担当者名",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    accessor: "phone",
    Header: "電話番号",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    accessor: "email",
    Header: "Eメール",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    accessor: "address",
    Header: "住所",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    accessor: "fromUrl",
    Header: "流入サイト",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "状態",
    accessor: "state",
    Filter: SelectColumnFilter,
    filter: "includes",
    disableSortBy: true,
  },
  {
    accessor: "concierge",
    Header: "商談対応者",
    disableFilters: true,
    disableSortBy: true,
  },
];

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (id === "state") {
    return (
      <FormControl
        fullWidth
        sx={{
          width: "120px",
          "& fieldset": {
            borderWidth: "0",
          },
        }}
      >
        <Select
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          sx={{
            "& .MuiSelect-select": {
              fontSize: "0.765rem",
            },
          }}
          className={clsx(`custom_state${stateString.indexOf(value) + 1}`)}
        >
          {stateString.map((item) => {
            return (
              <MenuItem value={item} sx={{ fontSize: "0.765rem" }} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
    // < input value = { value } onChange = { onChange } onBlur = { onBlur } />;
  }
  if (id === "fromUrl") {
    return (
      <p>
        {value.title}
        <br />
        {value.url}
      </p>
    );
  } else {
    return String(value);
  }
};

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Render a multi-select box
  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{ p: 0 }}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ButtonGroup orientation="vertical" className={styles.button_group}>
          <Button variant="text" onClick={() => setFilter("")}>
            選択解除
          </Button>
          {stateString.map((item, index) => {
            return (
              <Button
                key={item}
                variant="text"
                onClick={() => {
                  setFilter(stateString[index]);
                }}
                disabled={!options.includes(item)}
                className={clsx(filterValue === item && "activated")}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#fff",
                    color: "rgba(0,0,0,0.2)",
                  },
                }}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
      </Popover>
    </>
  );
}

const NewAppointment = () => {
  const { dataList, setNewNotice } = useContext(DataContext);
  const [data, setData] = useState([]);

  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
      Filter: SelectColumnFilter,
    }),
    []
  );
  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: "date", desc: true }],
    }),
    []
  );

  const updateMyData = async (index, id, value) => {
    const updateData = {
      state: stateString.indexOf(value) + 1,
    };
    // console.log(data[index].id, updateData);
    try {
      await updateDoc(doc(db, "appointment", data[index].id), updateData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // データのセット
    setData(
      dataList.map((item) => {
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
      })
    );
    // 既読
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, defaultColumn, initialState, updateMyData },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <HomeLayout title="アポイント管理">
      <Box
        sx={{
          height: "78vh",
          width: "100%",
          overflowX: "auto",
          borderRadius: "4px",
          bgcolor: "#ffffff",
          boxShadow: "rgb(137 137 137 / 16%) 0px 4px 5px 0px",
          px: 2,
          py: 0,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "right",
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              px: "2em",

              "& a": { textDecoration: "none", color: "inherit" },
            }}
          >
            <CSVLink data={data}>CSVエクスポート</CSVLink>
          </Button>
        </Box>
        <table {...getTableProps()} className={styles.custom_table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.canFilter ? column.render("Filter") : null}
                    {/* Add a sort direction indicator */}

                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IconButton className={styles.sortIcon} sx={{ p: 0 }}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      ) : (
                        <IconButton className={styles.sortIcon} sx={{ p: 0 }}>
                          <ArrowDropUpIcon />
                        </IconButton>
                      )
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <IconButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => nextPage()} disabled={!canNextPage}>
            <KeyboardArrowRightIcon />
          </IconButton>
          <Typography variant="p">
            Page {pageIndex + 1} of {pageOptions.length}
          </Typography>
        </div>
      </Box>
    </HomeLayout>
  );
};

export default NewAppointment;
