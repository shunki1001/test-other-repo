import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";

const ShowTagCode = (props) => {
  const { showTag, setShowTag } = props;
  const { domain, userSite } = useContext(DataContext);

  // Todo: restrict url
  const tag = `<script type="text/javascript">let modal = document.createElement("div");const createIframe = () => {modal.style.display = "none";modal.style.position = "fixed";modal.style.bottom = "0";modal.style.right = "0";modal.style.zIndex = "9999";let obj = document.createElement("iframe");obj.setAttribute("frameBorder", "0");obj.setAttribute("scrolling", "no");obj.style.width = "350px";obj.style.height = "400px";obj.src = "https://mtg-non-apo.web.app/iframe/${domain}";modal.appendChild(obj);document.body.appendChild(modal);};setTimeout(() => {const httpIndex = location.href.indexOf("://");const domainIndex = location.href.indexOf("/", httpIndex + 3);if (domainIndex !== -1) {if (location.href.slice(httpIndex + 3, domainIndex) == "${userSite}") {createIframe();}} else if (domainIndex === -1) {if (location.href.slice(httpIndex + 3) == "${userSite}") {createIframe();}}}, 1000);setTimeout(()=>{modal.style.display = "block";},6000);</script>`;
  const handleClickDialog = () => {
    navigator.clipboard.writeText(tag);
    setShowTag(false);
  };
  return (
    <Dialog
      open={showTag}
      maxWidth="md"
      fullWidth
      onClose={() => setShowTag(false)}
    >
      <DialogContent sx={{ mx: 15 }}>
        <Box
          sx={{
            textAlign: "center",
            "& p": { marginTop: "1em", fontWeight: 700 },
            "& h5": { fontWeight: 700 },
          }}
        >
          <Typography variant="h5">商談タグを発行完了</Typography>
          <Typography>
            HPの &lt;body&gt;~&lt;/body&gt;の内側に設置ください。
          </Typography>
        </Box>
        <Box sx={{ border: "1px solid #707070", m: 2, p: 2 }}>
          <Typography sx={{ overflowWrap: "break-word", fontSize: "0.7rem" }}>
            {tag}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: "20px" }}>
        <Button
          onClick={() => setShowTag(false)}
          variant="contained"
          sx={{ py: "10px", px: 6, background: "grey" }}
        >
          閉じる
        </Button>
        <Button
          onClick={() => handleClickDialog()}
          variant="contained"
          sx={{ py: "10px", px: 6 }}
        >
          タグをコピー
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowTagCode;
