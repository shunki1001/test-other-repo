import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("この項目は必須です"),
  company: yup.string().required("この項目は必須です"),
  phone: yup.string().required("この項目は必須です"),
  email: yup
    .string()
    .required("この項目は必須です")
    .email("正しいメールアドレス入力してください"),
  url: yup.string().required("この項目は必須です"),
  mainButton: yup
    .string()
    .required("この項目は必須です")
    .max(8, "最大8文字です"),
  // password: yup
  //   .string()
  //   .required("この項目は必須です")
  //   .min(6, "少ないよ")
  //   .matches(
  //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&].*$/,
  //     "パスワード弱いよ"
  //   ),
  // address: yup.string().required("この項目は必須です"),
  // numberOfSite: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(0, "０以上の数字を選んでください"),
  // domain: yup.string().required("この項目は必須です"),
  // subscriptionStartYear: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(2000, "正しく入力してください"),
  // subscriptionStartMonth: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(1, "1~12月で選んでください")
  //   .max(12, "1~12月で選んでください"),
  // numberOfAccount: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(0, "０以上の数字を選んでください"),
  // subscriptionCost: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(0, "０以上の数字を選んでください"),
  // subscriptionDuration: yup
  //   .number("")
  //   .typeError("数字を入力してください")
  //   .required("この項目は必須です")
  //   .min(0, "０以上の数字を選んでください"),
});

export default schema;
