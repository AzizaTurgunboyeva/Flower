const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3030;
const mainRouter = require("./routes");
let app = express();


app.use(express.json()); //body ichini o'qidi, post metod

app.use("/api", mainRouter); //routesdagi fayllari olad

app.listen(PORT, () => {
  console.log(`Server worked https:localhost:${PORT}`);
});
