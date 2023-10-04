var PORT = 3000;
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/pages", express.static("./views/pages"));
app.use("/images", express.static("./assets/images"));
app.use("/assets", express.static("./assets"));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/js", express.static("./node_modules/jquery/dist"));

app.use(express.urlencoded({ extended: true }));

var rotas = require("./routes/main.route");
app.use("/", rotas);

var user = require("./routes/user.route");
app.use("/", user);

var api = require("./routes/api.route");
app.use("/", api);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Servidor iniciado na porta: ", PORT);
});


 
