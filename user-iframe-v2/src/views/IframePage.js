import "bootstrap/dist/css/bootstrap.min.css";
// import "./bootstrap.min.css";
import "../styles/ld-original.css";
import "../styles/style.css";
import "../styles/add-style.css";

import { Avatar, Button, Link, Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import getInfo from "../functions/getInfo";
import { DataContext } from "../context/DataContext";
import registFromUrl from "../functions/registFromUrl";
import { animateScroll as scroller } from "react-scroll";
import CloseIcon from "@mui/icons-material/Close";

function IframePage() {
  // const { setDomain, firstAccount, domain } = useContext(DataContext);
  const { setWhereFrom } = useContext(DataContext);
  const [firstAccount, setFirstAccount] = useState({});
  const [helpMessageOpen, setHelpMessageOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [haveSubbutton, setHaveSubbutton] = useState(true);

  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  let params = useParams();

  const domain = params.domain;
  let fromUrl = document.referrer;

  // const fromUrl = "https://sukenojo.com/";

  const scrollToTop = () => {
    console.log("clicked");
    scroller.scrollTo("scroll_down", {
      duration: 1000,
      delay: 2000,
      smooth: true,
      offset: -50,
    });
  };

  const handleNextButton = async () => {
    registFromUrl(domain, fromUrl, navigate);
  };
  const handleCloseClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    // ドメイン取得して、isFirstアカウントの情報を取得

    getInfo(domain, fromUrl, setFirstAccount, setOnline, setHaveSubbutton);
    setWhereFrom(fromUrl);
  }, []);

  return (
    <div id="wrap">
      <main id="content" className="content">
        {/* <section className="cover-blue">
          <div className="container">
            <div className="row"></div>
          </div>
        </section> */}
        {open ? (
          <div className="chat customize-chat" id="p2">
            <div className="chat-title chat-title-customize">
              <h1 style={{ display: "inline" }}>{firstAccount?.username}</h1>
              <br />
              {online ? (
                <>
                  <span className="atn btn--shockwave is-active"></span>
                  <span
                    style={{
                      color: "#181b31",
                      fontSize: "10px",
                      marginRight: "6px",
                    }}
                  >
                    オンライン
                  </span>
                </>
              ) : (
                <>
                  <span className="btn btn_shockwave passive"></span>
                  <span
                    style={{
                      color: "#181b31",
                      fontSize: "10px",
                      marginRight: "6px",
                    }}
                  >
                    オフライン
                  </span>
                </>
              )}

              <h2 style={{ display: "inline" }}>{firstAccount?.company}</h2>
              <Box sx={{ position: "absolute", top: "8px", left: "9px" }}>
                <Avatar
                  sx={{
                    height: "30px",
                    width: "30px",
                  }}
                  src={firstAccount?.avatar}
                />
              </Box>
              <IconButton
                onClick={handleCloseClick}
                sx={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  padding: "0",
                  float: "right",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="messages">
              <div className="messages-content scroll">
                <div className="message new">
                  <figure className="avatar">
                    <Avatar
                      sx={{ width: "26px", height: "26px" }}
                      src={firstAccount?.avatar}
                    />
                  </figure>
                  何かお困りの事はございませんか？
                </div>
                <div className="message new">
                  <figure className="avatar">
                    <Avatar
                      sx={{ width: "26px", height: "26px" }}
                      src={firstAccount?.avatar}
                    />
                  </figure>
                  今すぐオンライン商談が可能です！
                  <br />
                  <img
                    className="mtg-bg"
                    src={firstAccount?.thumbnail}
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                  <div className="mtg-btn message-submit btn-gradient-bg">
                    <a href="#">アポなし面談</a>
                  </div>
                </div>
                {helpMessageOpen && (
                  <>
                    <div className="message new">
                      <figure className="avatar">
                        <Avatar
                          sx={{ width: "26px", height: "26px" }}
                          src={firstAccount?.avatar}
                        />
                      </figure>
                      {firstAccount?.subButtonTitle}ですね
                    </div>
                    <div className="message new customize-message">
                      <figure className="avatar">
                        <Avatar
                          sx={{ width: "26px", height: "26px" }}
                          src={firstAccount?.avatar}
                        />
                      </figure>
                      下記からお選びください。
                      <br />
                      <br />
                      <div className="row chat-btns">
                        <div className="col-md-12">
                          {firstAccount?.button?.map((item) => {
                            if (item.title === "") {
                              return <></>;
                            } else {
                              return (
                                <Link
                                  target="_top"
                                  href={item.url}
                                  sx={{ textDecoration: "none" }}
                                >
                                  <Button
                                    key={item.title}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                      background: "rgb(255 255 255)",
                                      border: "1px solid #4762ff !important",
                                      color: "#4762ff !important",
                                      borderRadius: "15px",
                                      fontSize: "15px",
                                      boxShadow:
                                        "0px 3px 16px 0px rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                                      fontWeight: "700",
                                      lineHeight: "0",
                                      height: "33px",
                                      py: 0,
                                      mb: "10px",
                                    }}
                                  >
                                    {item.title}
                                  </Button>
                                </Link>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="message-box">
              <div className="content">
                {/* サブボタンを設定している？サブボタンは任意 */}
                {haveSubbutton === false ? (
                  <div className="row">
                    <div className="col-3"></div>
                    <div
                      className="col-6"
                      style={{
                        paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                        paddingRight: "calc(var(--bs-gutter-x)*.2)",
                      }}
                    >
                      <div className="buttons">
                        <Button
                          onClick={() => {
                            handleNextButton();
                            // navigate(`/${domain}`);
                            // window.location.href = `https://mtg-non-apo.web.app/${domain}`;
                          }}
                          variant="contained"
                          sx={{
                            p: 0,
                            color: "#fff",
                            backgroundColor: "#4762ff",
                            paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                            paddingRight: "calc(var(--bs-gutter-x)*.2)",
                          }}
                          className="button btn-apo-bg circle"
                        >
                          {firstAccount?.mainButton}
                        </Button>
                      </div>
                    </div>
                    <div className="col-3"></div>
                  </div>
                ) : (
                  <div className="row">
                    <div
                      className="col-6"
                      style={{
                        paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                        paddingRight: "calc(var(--bs-gutter-x)*.2)",
                      }}
                    >
                      <div className="buttons">
                        {/* サブボタンを設定している人の内、複数ボタンを持っている？ */}
                        {firstAccount?.isOneSubButton ? (
                          <>
                            <Link
                              href={firstAccount?.button[0]?.url}
                              target="_top"
                              sx={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  p: 0,
                                  fontSize: "16px",
                                  paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                                  paddingRight: "calc(var(--bs-gutter-x)*.2)",
                                }}
                                className="button btn-now-bg circle message-sub"
                              >
                                {firstAccount?.button[0]?.title}
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <Button
                            onClick={() => {
                              setHelpMessageOpen(true);
                              scrollToTop();
                            }}
                            variant="outlined"
                            sx={{
                              p: 0,
                              fontSize: "16px",
                              paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                              paddingRight: "calc(var(--bs-gutter-x)*.2)",
                            }}
                            className="button btn-now-bg circle message-sub"
                          >
                            {firstAccount?.subButtonTitle}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-6"
                      style={{
                        paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                        paddingRight: "calc(var(--bs-gutter-x)*.2)",
                      }}
                    >
                      <div className="buttons">
                        <Button
                          onClick={() => {
                            handleNextButton();
                            // navigate(`/${domain}`);
                            // window.location.href = `https://mtg-non-apo.web.app/${domain}`;
                          }}
                          variant="contained"
                          sx={{
                            p: 0,
                            color: "#fff",
                            backgroundColor: "#4762ff",
                            fontSize: "16px",
                            paddingLeft: "calc(var(--bs-gutter-x)*.2)",
                            paddingRight: "calc(var(--bs-gutter-x)*.2)",
                          }}
                          className="button btn-apo-bg circle"
                        >
                          {firstAccount?.mainButton}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <div
              id="chat-circle"
              className="btn btn-raised"
              style={{ display: "block" }}
            >
              <div id="chat-overlay"></div>
              <i className="fa fa-laptop" style={{ fontSize: "28px" }}></i>
            </div>
          </Button>
        )}

        {/* <div id="chat-circle" className="btn btn-raised">
          <div id="chat-overlay"></div>
          <i className="fa fa-laptop" style={{ fontSize: "28px" }}></i>
        </div> */}
      </main>
    </div>
  );
}

export default IframePage;
