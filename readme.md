## フォルダ構成

- admin-page: 企業管理画面
- google-api: google カレンダー同期 API, メール自動送信 API
- user: ユーザー管理画面
- user-iframe-v2: ポップアップ画面
- database2.dio

## ソースコード改修手順

- FirebaseCLI 導入
- React の build: npm run build
- Firebase へ deploy: firebase deploy --only hosting: (domain 名)

## DB 構成

- enterprise: 企業情報。マスター管理画面で編集できる部分。
- site: 各企業の登録サイト情報
- account: 各企業のアカウント情報。button コレクションをサブコレクションに持つ
  - button: 各アカウントのボタン情報。
- tempAppointment: iframe から mtg-non-apo.web.app への遷移時に「遷移元 URL の情報」を保持するための一時保存情報。
- appointment: E/U がフォームに入力した情報。
