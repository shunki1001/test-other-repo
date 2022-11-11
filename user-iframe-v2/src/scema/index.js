import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("正しく入力してください"),
  email: yup
    .string()
    .required("正しく入力してください")
    .email("メールアドレス形式を入力してください")
    .matches(
      /^(?!.*(gmail|yahoo|icloud.com|outlook.com)).*$/,
      "フリーメールは受付ておりません"
    ),
  address: yup.string().required("正しく入力してください"),
  enterprise: yup.string().required("正しく入力してください"),
  phone: yup.string().required("正しく入力してください"),
});

export default schema;
