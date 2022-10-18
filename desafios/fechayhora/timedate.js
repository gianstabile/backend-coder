const fs = require("fs");
//declaro variable con fecha y hora
const timeDate = new Date().toLocaleString();
//escribo el archivo
fs.writeFileSync("./fechayhora/timedate.txt", timeDate + "\n");
fs.appendFileSync("./fechayhora/timedate.txt", timeDate + "\n");
fs.appendFileSync("./fechayhora/timedate.txt", timeDate + "\n");

try {
  let readFile = fs.readFileSync("./fechayhora/timedate.txt", "utf-8");
  console.log(readFile);
} catch (e) {
  console.log(e);
}
