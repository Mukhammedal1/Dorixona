const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const mainRouter=require("./routes/main")


const app = express();
app.use(express.json())

app.use("/",mainRouter)

app.listen(PORT, () => {
  console.log(`Server run at http://localhost:${PORT}`);
});
