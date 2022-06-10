const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//Parsing application/json
app.use(express.json());

//Static Files
app.use(express.static("public"));

app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server started at  ${port}`);
});
