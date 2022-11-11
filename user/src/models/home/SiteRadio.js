import { Box, IconButton, RadioGroup, FormControlLabel } from "@mui/material";
import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CustomRadio from "../../ui/CustomRadio";

const SiteRadio = () => {
  const { userSiteList, setUserSiteList, userSite, setUserSite } =
    useContext(DataContext);
  const handleDelete = (item, index) => {
    setUserSiteList(userSiteList.filter((eachItem) => eachItem !== item));
    setUserSite("");
  };
  return (
    <>
      <RadioGroup
        value={userSite}
        onChange={(e) => setUserSite(e.target.value)}
        sx={{ maxWidth: "600px" }}
      >
        {userSiteList.map((item, index) => {
          return (
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                value={item}
                control={<CustomRadio />}
                // label={`${item} ${siteTitleList[index]}`}
                label={item}
                name={item}
                key={item}
                sx={{ flexGrow: 1 }}
              />
              <IconButton
                onClick={() => handleDelete(item, index)}
                sx={{ color: "#5E72E4", width: "2em" }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          );
        })}
      </RadioGroup>

      {/* <Box
            width="100%"
            key={item}
            sx={{ display: "flex" }}
          >
            <Radio
              checked={userSite === item}
              onChange={(e) => setUserSite(e.target.name)}
              name={item}
              icon={
                <img
                  src={radioIcon}
                  alt="checked"
                  style={{
                    width: "1em",
                    fontSize: "1.5rem",
                  }}
                />
              }
              checkedIcon={
                <>
                  <img
                    src={radioIcon}
                    alt="checked"
                    style={{
                      position: "absolute",
                      width: "1em",
                      fontSize: "1.5rem",
                    }}
                  />
                  <CircleIcon
                    fontSize="small"
                    sx={{
                      color: "#5E72E4",
                      position: "relative",
                    }}
                  />
                </>
              }
            />
            <Typography
              sx={{
                display: "inline-block",
                flexGrow: 1,
                p: 1,
                fontWeight: 700,
              }}
            >
              {item}
            </Typography>
            
          </Box> */}
    </>
  );
};

export default SiteRadio;
