import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import CustomRadio from "../../ui/CustomRadio";

const placeholder = [
  {
    title: "まずは資料請求",
    url: "https://example.com/document",
  },
  {
    title: "よくある質問",
    url: "https://example.com/help",
  },
  {
    title: "サービスの紹介動画",
    url: "https://example.com/youtube",
  },
  {
    title: "デモ・体験版",
    url: "https://example.com/demo",
  },
];

const SubButtonInput = () => {
  const {
    isOneSubButton,
    setIsOneSubButton,
    subButtonTitle,
    setSubButtonTitle,
    subButtonList,
    setSubButtonList,
  } = useContext(DataContext);

  const [renderList, setRenderList] = useState([]);

  useEffect(() => {
    setRenderList(
      subButtonList.filter((item) => {
        return item.isOnly === isOneSubButton;
      })
    );
  }, [isOneSubButton, subButtonList]);

  return (
    <>
      <Box sx={{ my: 4, ml: 0.5 }}>
        <RadioGroup
          value={isOneSubButton}
          onChange={(e) => setIsOneSubButton(e.target.value === "true")}
          row
        >
          <FormControlLabel
            value={true}
            control={<CustomRadio />}
            label="サブボタンをつける（任意）"
          />
          <FormControlLabel
            value={false}
            control={<CustomRadio />}
            label="サブボタンを複数つける（任意）"
          />
        </RadioGroup>
      </Box>
      <Box>
        {!isOneSubButton && (
          <>
            <Typography sx={{ fontWeight: 700 }}>ボタンタイトル</Typography>
            <TextField
              value={subButtonTitle}
              onChange={(e) => {
                setSubButtonTitle(e.target.value);
              }}
              placeholder="ヘルプ・その他"
              inputProps={{
                maxLength: 8,
              }}
            />
            <Box sx={{ display: "inline-block", mt: 2 }}>
              <Typography variant="caption" sx={{ ml: 3 }}>
                左記ボタンが先頭表示されその後下記ボタンが選択肢となります。
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        )}
        <Grid container>
          {renderList.map((item, index) => {
            return (
              <Grid item container xs={12} sm={12} key={item.id}>
                <Grid item xs={12} sm={5} sx={{ my: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {isOneSubButton ? (
                      <>ボタンタイトル（最大8文字）</>
                    ) : (
                      <>ボタンタイトル{index + 1}（最大8文字）</>
                    )}
                  </Typography>
                  <TextField
                    sx={{ width: "90%" }}
                    value={item.title}
                    placeholder={placeholder[index].title}
                    onChange={(e) => {
                      setRenderList(
                        renderList.map((element, selectIndex) => {
                          if (selectIndex === index) {
                            return { ...element, title: e.target.value };
                          } else {
                            return { ...element };
                          }
                        })
                      );
                      setSubButtonList(
                        subButtonList.map((element) => {
                          if (element.id === item.id) {
                            return { ...element, title: e.target.value };
                          } else {
                            return { ...element };
                          }
                        })
                      );
                    }}
                    inputProps={{
                      maxLength: 8,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={7} sx={{ my: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>遷移先URL</Typography>
                  <TextField
                    sx={{ width: "90%" }}
                    value={item.url}
                    placeholder={placeholder[index].url}
                    onChange={(e) => {
                      setRenderList(
                        renderList.map((element, selectIndex) => {
                          if (selectIndex === index) {
                            return { ...element, url: e.target.value };
                          } else {
                            return { ...element };
                          }
                        })
                      );
                      setSubButtonList(
                        subButtonList.map((element) => {
                          if (element.id === item.id) {
                            return { ...element, url: e.target.value };
                          } else {
                            return { ...element };
                          }
                        })
                      );
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {/* {isOneSubButton === true ? (
          <Grid container>
            <Grid item xs={12} sm={5} sx={{ my: 1 }}>
              <Typography>ボタンタイトル（最大10文字）</Typography>
              <TextField
                sx={{ width: "90%" }}
                value={onlySubButton}
                onChange={(e) => {
                  setOnlySubButton({ ...onlySubButton, title: e.target.value });
                  setMultiSubButton(
                    multiSubButton.map((item) => {
                      if (onlySubButton.id === item.id) {
                        return { ...item, title: e.target.value };
                      } else {
                        return {
                          ...item,
                        };
                      }
                    })
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7} sx={{ my: 1 }}>
              <Typography>遷移URL</Typography>
              <TextField
                sx={{ width: "90%" }}
                value={onlySubButton}
                onChange={(e) => {
                  setOnlySubButton({ ...onlySubButton, utl: e.target.value });
                  setMultiSubButton(
                    multiSubButton.map((item) => {
                      if (onlySubButton.id === item.id) {
                        return { ...item, url: e.target.value };
                      } else {
                        return {
                          ...item,
                        };
                      }
                    })
                  );
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography>ボタンタイトル</Typography>
            <TextField
              value={subButtonTitle}
              onChange={(e) => setSubButtonTitle(e.target.value)}
            />
            <Divider sx={{ my: 2 }} />
            <Grid container>
              {multiSubButton.map((item, selecetIndex) => {
                return (
                  <>
                    <Grid item xs={12} sm={5} sx={{ my: 1 }}>
                      <Typography>ボタンタイトル（最大10文字）</Typography>
                      <TextField
                        sx={{ width: "90%" }}
                        value={item.title}
                        onChange={(e) => {
                          setMultiSubButton(
                            multiSubButton.map((item, index) => {
                              if (selecetIndex === index) {
                                return { ...item, title: e.target.value };
                              } else {
                                return { ...item };
                              }
                            })
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7} sx={{ my: 1 }}>
                      <Typography>遷移URL</Typography>
                      <TextField
                        sx={{ width: "90%" }}
                        value={item.url}
                        onChange={(e) => {
                          setMultiSubButton(
                            multiSubButton.map((item, index) => {
                              if (selecetIndex === index) {
                                return { ...item, url: e.target.value };
                              } else {
                                return { ...item };
                              }
                            })
                          );
                        }}
                      />
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        )} */}
      </Box>
    </>
  );
};

export default SubButtonInput;
