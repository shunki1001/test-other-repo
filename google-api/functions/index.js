// const functions = require("firebase-functions");

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const getUrlTitle = require("get-url-title");

const { google } = require("googleapis");

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
// const admin = require("firebase-admin");
// admin.initializeApp();

const app = express();
app.use(
  cors({
    origin: ["https://mtg-non-apo.web.app", "https://non-apo.web.app"],
  })
);

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

app.get("/get-title", async (req, res) => {
  const hpTitle = await getUrlTitle(req.query.url);
  if (hpTitle === undefined) {
    res.send(JSON.stringify({ title: "none" }));
  } else {
    res.send(JSON.stringify({ title: hpTitle }));
  }
});

app.get("/google", (req, res) => {
  calendar.events.list(
    {
      calendarId: req.query.google,
      timeMin: new Date().toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          const nowTime = Date.now();
          const eventStartTime = new Date(result.data.items[0].start.dateTime);
          const eventEndTime = new Date(result.data.items[0].end.dateTime);
          if (nowTime < eventStartTime) {
            res.send(
              JSON.stringify({
                isOnline: true,
                message: "Next event has not yet started ",
              })
            );
          } else if (nowTime > eventStartTime) {
            if (nowTime < eventEndTime) {
              res.send(
                JSON.stringify({
                  isOnline: false,
                  message: "event is going now ",
                })
              );
            } else {
              res.send(
                JSON.stringify({ isOnline: false, message: "anyway offline" })
              );
            }
          } else {
            res.send(
              JSON.stringify({ isOnline: false, message: "in switching time" })
            );
          }
          // res.send("Hello " + req.query.name);
        } else {
          res.send(JSON.stringify({ isOnline: true, message: "cacth error" }));
        }
      }
    }
  );
});

// app.listen(3000, () => console.log(`App listening on port 3000!`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const userMail = process.env.TEST_USER;
// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.lolipop.jp",
//   auth: {
//     user: userMail,
//     pass: process.env.TEST_PASSWORD,
//   },
//   secure: true, // upgrades later with STARTTLS -- change this based on the PORT
// });

const userMail = process.env.USER;
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.lolipop.jp",
  auth: {
    user: userMail,
    pass: process.env.PASSWARD,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

// const userMail = process.env.USER;
// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "sv7077.xserver.jp",
//   auth: {
//     user: userMail,
//     pass: process.env.PASSWORD,
//   },
//   secure: true, // upgrades later with STARTTLS -- change this based on the PORT
// });

app.post("/mailer/user", async (req, res) => {
  const {
    name,
    phone,
    email,
    enterprise,
    address,
    whereFrom,
    accountName,
    mtgUrl,
    accountEmail,
  } = req.body;
  let hpTitle;
  try {
    hpTitle = await getUrlTitle(whereFrom);
  } catch (error) {
    hpTitle = "";
  }
  const mailData = {
    from: userMail,
    to: accountEmail,
    subject: `ノンアポ経由で商談依頼_${hpTitle}`,
    text: "商談依頼",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style type="text/css">
        body {line-height:1.5em;font-size:10.5px }
        p{margin: 0 auto;}
      </style>
    </head>
    <body>
      <div>
        <p>
          遷移元サイト：${whereFrom} | ${hpTitle}
        </p>
        <br />
        <p>お名前：${name}</p>
        <p>会社名：${enterprise}</p>
        <p>電話番号：${phone}</p>
        <p>商談担当者：${accountName}</p>
        <p>メール：${email}</p>
        <br />
        <br />
        <p>アポ無し商談フォームから商談希望のお問い合わせがありました。</p>
        <br />
        <p>速やかにMTGルームにアクセスしてください</p>
        <br />
        <a href=${mtgUrl}>${mtgUrl}</a>
      </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(400).send({ error: error });
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

app.post("/mailer/online", (req, res) => {
  const { email, enterprise, account, mtgUrl, phone } = req.body;
  const mailData = {
    from: userMail,
    to: email,
    subject: "アポ無し商談依頼ありがとうございます。",
    text: "アポ無し商談",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style type="text/css">
        body {line-height:1.5em;font-size:10.5px }
        p{margin: 0 auto;}
      </style>
    </head>
    <body>
    <div>
        <p>アポ無し商談依頼、誠にありがとうございます。</p>
        <br />
        <p>いつもお世話になっております。</p>
        <p>
          ${enterprise}の${account}でございます。
        </p>
        <br />
        <p>こちらMTG URLになります。</p>
        <br />
        <a href=${mtgUrl}>${mtgUrl}</a>
        <p>
          （登録一切不要、アクセスお願いします）速やかにアクセスお願い致します。
        </p>
        <br />
        <p>緊急連絡先：${phone}</p>
        <br />
        <p>ご返信お待ちしております。</p>
      </div>
      </body>
      </html>
    `,
  };
  try {
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/mailer/offline", (req, res) => {
  const { email, account, enterprise, contents } = req.body;
  const mailData = {
    from: userMail,
    to: email,
    subject: "不在_アポ無し商談依頼ありがとうございます。",
    text: "アポ無し商談",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style type="text/css">
        body {line-height:1.5em;font-size:10.5px;margin:0 auto; }
        p{margin: 0 auto;}
      </style>
    </head>
    <body>
      <div>
        <p>
          ${enterprise} ${account}様
        </p>
        <p>${contents}</p>
      </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

// app.listen(3000, () => console.log(`App listening on port 3000!`));
exports.functions = functions.region("asia-northeast1").https.onRequest(app);
