import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import addData from "../../function/addData";
import editData from "../../function/editData";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../scema";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const CreateModal = (props) => {
  const { newOpen, setNewOpen, newData, setNewData } = props;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  // when modal is closed, newData is reset
  useEffect(() => {
    if (!newOpen) {
      setNewData({
        id: "",
        enterprise: "",
        email: "",
        password: "",
        address: "",
        numberOfSite: 1,
        subscriptionStartYear: 2022,
        subscriptionStartMonth: 1,
        numberOfAccount: 1,
        subscriptionCost: "",
        subscriptionDuration: "",
        isAgreement: true,
      });
    }
  }, [newOpen]);

  const onSubmit = async (data) => {
    setLoadingOpen(true);
    // 新規作成時
    if (newData.id === undefined || newData.id === "") {
      let userList = [];
      const docRef = await getDocs(
        query(collection(db, "enterprise"), where("email", "==", data.email))
      );
      if (!docRef.empty) {
        alert("すでに登録済みのアカウントです");
        setLoadingOpen(false);
      } else {
        try {
          await addData(data);
          setNewOpen(false);
        } catch (e) {
          alert("Cannnot add! Try again");
          console.error("Error adding document: ", e);
        }
        setLoadingOpen(false);
      }
    } else {
      // 編集時
      try {
        await editData(newData, data);
        setNewOpen(false);
        setLoadingOpen(false);
      } catch (e) {
        alert("Cannnot add! Try again");
        setLoadingOpen(false);
        console.error("Error adding document: ", e);
      }
    }
  };
  useEffect(() => {
    reset(newData);
  }, [newData]);

  return (
    <>
      <Dialog
        open={newOpen}
        onClose={() => setNewOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          "& .MuiDialog-paper": { zIndex: "2000" },
        }}
      >
        <DialogTitle id="scroll-dialog-title">新規追加</DialogTitle>
        <DialogContent
          sx={{
            "& .MuiInputBase-root": { my: 1 },
            "& .MuiFormControl-root": { my: 1 },
          }}
          id="scroll-dialog-description"
        >
          <TextField
            autoFocus
            required
            margin="dense"
            id="enterprise"
            label="企業名"
            type="text"
            fullWidth
            variant="filled"
            error={"enterprise" in errors}
            helperText={errors.enterprise?.message}
            {...register("enterprise")}
            // value={newData.enterprise}
            // onBlur={(e)=>handleBlur(e, "enterprise")}
            // onChange={(e) =>
            //   setNewData({ ...newData, enterprise: e.target.value })
            // }
            sx={{
              "& label": { mt: 1 },
            }}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Eメール"
            type="email"
            fullWidth
            variant="filled"
            error={"email" in errors}
            helperText={errors.email?.message}
            {...register("email")}
            // error={inputError.email}
            // value={newData.email}
            // onBlur={(e)=>handleBlur(e, "email")}
            // onChange={(e) => setNewData({ ...newData, email: e.target.value })}
            sx={{ "& label": { mt: 1 } }}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="パスワード"
            type={isRevealPassword ? "text" : "password"}
            fullWidth
            variant="filled"
            error={"password" in errors}
            helperText={errors.password?.message}
            {...register("password")}
            // error={inputError.password}
            // value={newData.password}
            // onBlur={(e)=>handleBlur(e, "password")}
            // onChange={(e) => setNewData({ ...newData, password: e.target.value })}
            sx={{ "& label": { mt: 1 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsRevealPassword(!isRevealPassword);
                    }}
                    edge="end"
                  >
                    {isRevealPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            margin="dense"
            id="address"
            name="address"
            label="住所"
            type="text"
            fullWidth
            variant="filled"
            error={"address" in errors}
            helperText={errors.address?.message}
            {...register("address")}
            // error={inputError.address}
            // value={newData.address}
            // onBlur={(e)=>handleBlur(e, "address")}
            // onChange={(e) => setNewData({ ...newData, address: e.target.value })}
            sx={{ "& label": { mt: 1 } }}
          />
          <TextField
            required
            margin="dense"
            id="numberOfSite"
            name="numberOfSite"
            label="設置するサイト数"
            type="number"
            fullWidth
            variant="filled"
            error={"numberOfSite" in errors}
            helperText={errors.numberOfSite?.message}
            {...register("numberOfSite")}
            // disabled={newData.id !== ""}
            // error={inputError.numberOfSite}
            // value={newData.numberOfSite}
            // onBlur={(e)=>handleBlur(e, "numberOfSite")}
            // onChange={(e) =>
            //   setNewData({ ...newData, numberOfSite: e.target.value })
            // }
            sx={{ "& label": { mt: 1 } }}
          />
          {/* <TextField
          required
          margin="dense"
          id="privacyPolicy"
          name="privacyPolicy"
          label="プライバシーポリシーURL"
          type="text"
          fullWidth
          variant="filled"
          value={newData.privacyPolicy}
          onChange={(e) =>
            setNewData({ ...newData, privacyPolicy: e.target.value })
          }
        sx={{ "& label": { mt: 1 },}} />  */}
          <TextField
            required
            margin="dense"
            id="domain"
            name="domain"
            label="MTG URL(サードレベルドメイン)"
            type="text"
            fullWidth
            variant="filled"
            error={"domain" in errors}
            helperText={errors.domain?.message}
            {...register("domain")}
            // error={inputError.domain}
            // value={newData.domain}
            // onBlur={(e)=>handleBlur(e, "domain")}
            // onChange={(e) => setNewData({ ...newData, domain: e.target.value })}
            sx={{ "& label": { mt: 1 } }}
          />
          <DialogContentText>契約開始月</DialogContentText>
          <TextField
            required
            margin="dense"
            id="subscriptionStartYear"
            name="subscriptionStartYear"
            label="年"
            type="number"
            variant="filled"
            error={"subscriptionStartYear" in errors}
            helperText={errors.subscriptionStartYear?.message}
            {...register("subscriptionStartYear")}
            // value={newData.subscriptionStartYear}
            // onChange={(e) =>
            //   setNewData({ ...newData, subscriptionStartYear: e.target.value })
            // }
            sx={{ width: "42.5%", "& label": { mt: 1 } }}
          />
          <Typography
            variant="body"
            sx={{ display: "inline-block", mt: 4, mr: 2 }}
          >
            年
          </Typography>
          <TextField
            required
            margin="dense"
            id="subscriptionStartMonth"
            name="subscriptionStartMonth"
            label="月"
            type="number"
            variant="filled"
            error={"subscriptionStartMonth" in errors}
            helperText={errors.subscriptionStartMonth?.message}
            {...register("subscriptionStartMonth")}
            // value={newData.subscriptionStartMonth}
            // onChange={(e) =>
            //   setNewData({ ...newData, subscriptionStartMonth: e.target.value })
            // }
            sx={{ width: "42.5%", "& label": { mt: 1 } }}
          />
          <Typography variant="body" sx={{ display: "inline-block", mt: 4 }}>
            月
          </Typography>
          <TextField
            required
            margin="dense"
            id="numberOfAccount"
            name="numberOfAccount"
            label="アカウント数"
            type="number"
            fullWidth
            variant="filled"
            error={"numberOfAccount" in errors}
            helperText={errors.numberOfAccount?.message}
            {...register("numberOfAccount")}
            // disabled={newData.id !== ""}
            // error={inputError.numberOfAccount}
            // value={newData.numberOfAccount}
            // onBlur={(e)=>handleBlur(e, "numberOfAccount")}
            // onChange={(e) =>
            //   setNewData({ ...newData, numberOfAccount: e.target.value })
            // }
            sx={{ "& label": { mt: 1 } }}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="subscriptionCost"
            name="subscriptionCost"
            label="月額"
            variant="filled"
            error={"subscriptionCost" in errors}
            helperText={errors.subscriptionCost?.message}
            {...register("subscriptionCost")}
            // error={inputError.subscriptionCost}
            // value={newData.subscriptionCost}
            // onBlur={(e)=>handleBlur(e, "subscriptionCost")}
            // onChange={(e) =>
            //   setNewData({ ...newData, subscriptionCost: e.target.value })
            // }
            sx={{ "& label": { mt: 1 } }}
          />
          <TextField
            required
            margin="dense"
            id="subscriptionDuration"
            name="subscriptionDuration"
            label="契約期間"
            type="number"
            variant="filled"
            error={"subscriptionDuration" in errors}
            helperText={errors.subscriptionDuration?.message}
            {...register("subscriptionDuration")}
            // error={inputError.subscriptionDuration}
            // value={newData.subscriptionDuration}
            // onChange={(e) =>
            //   setNewData({ ...newData, subscriptionDuration: e.target.value })
            // }
            sx={{ "& label": { mt: 1 }, width: "90%" }}
          />
          <Typography variant="body" sx={{ display: "inline-block", mt: 4 }}>
            ヶ月
          </Typography>
          <Controller
            name="isAgreement"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth variant="filled">
                <InputLabel id="isAgreement">ステータス</InputLabel>
                <Select
                  labelId="isAgreement"
                  label="状況" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
                  {...field}
                  sx={{ my: 0 }}
                >
                  <MenuItem value={true}>契約中</MenuItem>
                  <MenuItem value={false}>解約中</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions sx={{ my: 2, pr: 5 }}>
          <Button
            onClick={() => setNewOpen(false)}
            variant="contained"
            color="cancel"
          >
            CANCEL
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1500 }}
        open={loadingOpen}
        onClick={() => setLoadingOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateModal;
