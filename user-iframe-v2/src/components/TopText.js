import React from "react";
import { Button } from "react-bootstrap";

const TopText = () => {
  return (
    <div className="wizard-header">
      <h4 className="wizard-title" style={{ fontSize: "1.3em" }}>
        <Button
          className="btn btn--shockwave is-active"
          style={{
            border: "none",
            borderRadius: "50%",
            padding: "9px",
            marginRight: "10px",
          }}
        ></Button>
        担当者へコールしております。
      </h4>
      <h6 style={{ fontSize: "1.25em", lineHeight: "1.4em" }}>
        下記内容を入力してお待ちください※全て必須項目です。
      </h6>
    </div>
  );
};

export default TopText;
