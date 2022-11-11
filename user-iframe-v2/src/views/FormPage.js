import "bootstrap/dist/css/bootstrap.min.css";
// import "./bootstrap.min.css"
import "../styles/form-component.css";

import { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import logTop from "../img/log-tp.png";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import PortraitIcon from "@mui/icons-material/Portrait";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";

import BoxCoveringInput from "../components/BoxCoveringInpuut";
import PartnerCard from "../components/PartnerCard";

import TopText from "../components/TopText";
import { DataContext } from "../context/DataContext";
import getInfoList from "../functions/getInfoList";
import registAppointment from "../functions/registAppointment";
import getInfoAccount from "../functions/getInfoAccount";
import mailSender from "../functions/mailSender";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../scema";

import MetaTag from "../MetaTag";

function FormPage() {
  const { whereFrom, setWhereFrom, setAppointmentUrl } =
    useContext(DataContext);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showSendButton, setShowSendButton] = useState(false);

  const [tabkey, setTabkey] = useState("input");

  const [formData, setFormData] = useState({});

  const [accountList, setAccountList] = useState([]);

  let params = useParams();
  const domain = params.domain;
  const index = params.index;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [selected, setSelected] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [snsAccount, setSnsAccount] = useState({});

  const handleClickSend = async (data) => {
    console.log("submit button clicked!");
    registAppointment(data, whereFrom, selected);
    // iframeから来た場合、選択された担当者のURLをセット
    if (index === undefined) {
      setAppointmentUrl(
        accountList.filter((item) => {
          return item.username === selected;
        })[0].url
      );
    }
    let selectedAccount = accountList[selectedIndex];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // メール送信
    mailSender(data, whereFrom, selectedAccount, snsAccount);
    navigate(`/${domain}/complete`);
  };

  useEffect(() => {
    if (index === undefined) {
      console.log("iframeからの流入");
      getInfoList(domain, whereFrom, setAccountList, setWhereFrom);
    } else {
      console.log("SNSからの流入");
      getInfoAccount(
        domain,
        index,
        setSelected,
        setAppointmentUrl,
        setSnsAccount
      );
    }
  }, []);

  useEffect(() => {
    if (tabkey === "input") {
      setShowBackButton(false);
      setShowNextButton(true);
      setShowSendButton(false);
    } else {
      setShowBackButton(true);
      setShowNextButton(false);
      setShowSendButton(true);
    }
  }, [tabkey]);

  const onSubmit = (data) => {
    setFormData(data);
    if (index === undefined) {
      setTabkey("choice");
    } else {
      handleClickSend(data);
    }
  };

  return (
    <div className="image-container set-full-height">
      <MetaTag account={snsAccount} sns={index !== undefined} />
      <a href="/">
        <div className="logo-container">
          <div className="brand">
            <div className="logo"></div>
          </div>
        </div>
      </a>

      <Container fluid="md" style={{ maxWidth: "1170px", fontSize: "0.85rem" }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div className="wizard-container">
              <div className="card wizard-card" data-color="red" id="wizard">
                <TopText />

                <Tabs
                  activeKey={tabkey}
                  justify
                  onSelect={(k) => setTabkey(k)}
                  className="custom-tab-nav"
                >
                  <Tab id="details" eventKey="input" title="情報入力">
                    <Row>
                      <Col sm={{ span: 12 }}>
                        <h5 className="info-text">
                          お送り頂き次第web商談させて頂きます
                        </h5>
                      </Col>
                      <Col sm={{ span: 6 }}>
                        <BoxCoveringInput>
                          <PersonIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                          <TextField
                            id="name"
                            name="name"
                            label="お名前(required)"
                            variant="standard"
                            fullWidth
                            error={"name" in errors}
                            sx={{
                              "& label": { fontSize: "14px", color: "#aaaaaa" },
                              "& .MuiInput-underline:before": {
                                borderBottom:
                                  "0.6px solid rgb(139 139 139 / 42%)",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "0.6px solid rgba(0, 0, 0, 0.87)",
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                {
                                  borderBottom:
                                    "0.6px solid rgba(0, 0, 0, 0.87)", // ホバー時のボーダー色
                                },
                            }}
                            {...register("name")}
                            helperText={errors.name?.message}
                          />
                        </BoxCoveringInput>
                        <BoxCoveringInput>
                          <MailIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                          <TextField
                            id="email"
                            name="email"
                            label="メールアドレス(required)"
                            variant="standard"
                            fullWidth
                            sx={{
                              "& label": { fontSize: "14px", color: "#aaaaaa" },
                              "& .MuiInput-underline:before": {
                                borderBottom:
                                  "0.6px solid rgb(139 139 139 / 42%)",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "0.6px solid rgba(0, 0, 0, 0.87)",
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                {
                                  borderBottom:
                                    "0.6px solid rgba(0, 0, 0, 0.87)", // ホバー時のボーダー色
                                },
                            }}
                            error={"email" in errors}
                            {...register("email")}
                            helperText={errors.email?.message}
                          />
                        </BoxCoveringInput>
                        <Typography variant="caption" sx={{ color: "#aaaaaa" }}>
                          ※gmailなどのフリーメールは受付ておりません
                        </Typography>
                      </Col>

                      <Col sm={{ span: 6 }}>
                        <BoxCoveringInput>
                          <PortraitIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                          <TextField
                            id="enterprise"
                            name="enterprise"
                            label="会社名(required)"
                            variant="standard"
                            fullWidth
                            error={"enterprise" in errors}
                            helperText={errors.enterprise?.message}
                            sx={{
                              "& label": { fontSize: "14px", color: "#aaaaaa" },
                              "& .MuiInput-underline:before": {
                                borderBottom:
                                  "0.6px solid rgb(139 139 139 / 42%)",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "0.6px solid rgba(0, 0, 0, 0.87)",
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                {
                                  borderBottom:
                                    "0.6px solid rgba(0, 0, 0, 0.87)", // ホバー時のボーダー色
                                },
                            }}
                            {...register("enterprise")}
                          />
                        </BoxCoveringInput>
                        <BoxCoveringInput>
                          <PhoneIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                          <TextField
                            id="phone"
                            name="phone"
                            label="電話番号(ハイフンあり)(required)"
                            variant="standard"
                            fullWidth
                            error={"phone" in errors}
                            helperText={errors.phone?.message}
                            sx={{
                              "& label": { fontSize: "14px", color: "#aaaaaa" },
                              "& .MuiInput-underline:before": {
                                borderBottom:
                                  "0.6px solid rgb(139 139 139 / 42%)",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "0.6px solid rgba(0, 0, 0, 0.87)",
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                {
                                  borderBottom:
                                    "0.6px solid rgba(0, 0, 0, 0.87)", // ホバー時のボーダー色
                                },
                            }}
                            {...register("phone")}
                          />
                        </BoxCoveringInput>
                      </Col>
                      <Col sm={{ span: 8 }}>
                        <BoxCoveringInput>
                          <EventIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                          <TextField
                            id="address"
                            name="address"
                            label="住所(required)"
                            variant="standard"
                            fullWidth
                            error={"address" in errors}
                            helperText={errors.address?.message}
                            sx={{
                              "& label": { fontSize: "14px", color: "#aaaaaa" },
                              "& .MuiInput-underline:before": {
                                borderBottom:
                                  "0.6px solid rgb(139 139 139 / 42%)",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottom: "0.6px solid rgba(0, 0, 0, 0.87)",
                              },
                              "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                                {
                                  borderBottom:
                                    "0.6px solid rgba(0, 0, 0, 0.87)", // ホバー時のボーダー色
                                },
                            }}
                            {...register("address")}
                          />
                        </BoxCoveringInput>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab id="captain" eventKey="choice" title="商談相手選択">
                    <PartnerCard
                      selected={selected}
                      setSelected={setSelected}
                      accountList={accountList}
                      setSelectedIndex={setSelectedIndex}
                    />
                  </Tab>
                </Tabs>
                <div className="wizard-footer">
                  <div className="pull-right">
                    {showNextButton && (
                      <input
                        type="button"
                        id="submit-input"
                        className="btn btn-next btn-fill btn-danger btn-wd"
                        name="next"
                        value="次へ"
                        onClick={handleSubmit(onSubmit)}
                      />
                    )}
                    {showSendButton && (
                      <input
                        type="button"
                        id="submit"
                        className="btn btn-finish btn-fill btn-danger btn-wd"
                        name="finish"
                        value="商談開始"
                        onClick={() => handleClickSend(formData)}
                      />
                    )}
                  </div>
                  <div className="pull-left">
                    {showBackButton && (
                      <input
                        type="button"
                        className="btn btn-previous btn-fill btn-default btn-wd"
                        name="previous"
                        value="戻る"
                        onClick={() => {
                          setTabkey("input");
                        }}
                      />
                    )}
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer">
        <div className="container text-center text-white">
          supported by
          <a href="https://non-appoint.com/">
            <img src={logTop} className="footer-logo" alt="logo" />
          </a>
          <br />
          © 2022 My alarm All Rights Reserved. <br />
          運営会社:<a href="https://myalarm.site/company">My Alarm株式会社</a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default FormPage;
