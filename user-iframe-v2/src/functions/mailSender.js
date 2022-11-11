import axios from "axios";

// export const serverDomain =
//   "http://127.0.0.1:5001/non-apo/us-central1/functions";
export const serverDomain =
  "https://asia-northeast1-non-apo.cloudfunctions.net/functions";

const mailSender = async (data, whereFrom, account, snsAccount) => {
  const userMailApi = `${serverDomain}/mailer/user`;
  const onlineApi = `${serverDomain}/mailer/online`;
  const offlineApi = `${serverDomain}/mailer/offline`;

  if (whereFrom === "") {
    try {
      await axios.post(userMailApi, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        enterprise: data.enterprise,
        whereFrom: "",
        accountName: snsAccount.username,
        mtgUrl: snsAccount.url,
        accountEmail: snsAccount.email,
      });
    } catch (error) {
      console.log(error);
    }
    await axios.post(onlineApi, {
      email: data.email,
      enterprise: snsAccount.company,
      account: snsAccount.username,
      mtgUrl: snsAccount.url,
      phone: snsAccount.phone,
    });
  } else {
    try {
      await axios.post(userMailApi, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        enterprise: data.enterprise,
        whereFrom: `https://${whereFrom}`,
        accountName: account.username,
        mtgUrl: account.url,
        accountEmail: account.email,
      });
    } catch (error) {
      console.log(error);
    }

    if (account.online) {
      await axios.post(onlineApi, {
        email: data.email,
        enterprise: account.company,
        account: account.username,
        mtgUrl: account.url,
        phone: account.phone,
      });
    } else {
      await axios.post(offlineApi, {
        email: data.email,
        enterprise: data.enterprise,
        account: data.name,
        contents: account.mailContent,
      });
    }
  }
};
export default mailSender;
