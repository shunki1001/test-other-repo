import { Avatar } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const PartnerCard = (props) => {
  const { selected, setSelected, accountList, setSelectedIndex } = props;
  return (
    <>
      <Col sm={{ span: 12 }}>
        <h4 className="customize-info-text">商談相手を選択してください</h4>
      </Col>

      <div className="select-os">
        <div className="scroll customize-scroll">
          <Row className="cutomize-row">
            {accountList.map((account, index) => {
              return (
                <Col sm={{ span: 6 }} key={account.id}>
                  <input
                    type="radio"
                    id={account.id}
                    name="os"
                    value={account.username}
                    className="osx"
                    checked={selected === account.username}
                    onChange={(e) => {
                      setSelected(e.target.value);
                      setSelectedIndex(index);
                    }}
                  />
                  <label htmlFor={account.id}>
                    <div
                      className="chat-title"
                      style={{ padding: "10px 10px 10px 76px" }}
                    >
                      <h1 style={{ marginBottom: "0.5em" }}>
                        面談担当:{account.username}
                      </h1>
                      <span className="pull-right" id="button4"></span>
                      {account.online ? (
                        <>
                          <span className="atn btn--shockwave is-active"></span>
                          <span style={{ color: "#181b31", fontSize: "12px" }}>
                            オンライン
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="btn btn_shockwave passive"
                            style={{
                              margin: "0",
                            }}
                          ></span>
                          <span
                            style={{
                              color: "#181b31",
                              fontSize: "12px",
                            }}
                          >
                            オフライン
                          </span>
                        </>
                      )}

                      <h2
                        style={{ display: "inline-block", marginLeft: "1em" }}
                      >
                        {account.company}
                      </h2>

                      <figure
                        className="avatar"
                        style={{ width: "54px", height: "54px" }}
                      >
                        <Avatar
                          sx={{ width: "50px", height: "50px" }}
                          src={account.avatar}
                        />
                      </figure>
                    </div>
                  </label>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>

      <h4 className="customize-info-text">
        宜しければ下記の商談ボタンを押してください。
      </h4>

      <Row>
        <Col sm={{ span: "10", offset: "1" }}></Col>
      </Row>
    </>
  );
};

export default PartnerCard;
