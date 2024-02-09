// app.js
const express = require("express");

const app = express();

app.use(express.static("build"));
//html파일들 안의 기본경로가 frontend로 설정되게 된다.
const port = 80;
//url의 포트를 설정

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
  //메인 페이지가 들어오는 경우 home과 연결
});

app.listen(port, () => console.log(`${port}번 포트에서 대기중`));
