// for inject env variables from config
require("dotenv").config();

// db related stuff
// require("./api/data/db");
// require("./api/data/model/match.model");
// require("./api/data/model/user.model");
// require("./api/data/model/sellRequest.model");
// require("./api/data/model/setting.model");

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const expressStaticGzip = require("express-static-gzip");
// const IoService = require("./services/IoService");
const { errorHandler } = require("./middlewares");

const app = express();
const server = http.createServer(app);

const routes = require("./api/routes");

app.use(bodyParser.json({limit: '20kb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["bdqqwshnichb"]
  })
);

// initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// require("./services/passport");

app.use("/api", routes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(
    expressStaticGzip("build", {
      enableBrotli: true,
      customCompressions: [
        {
          encodingName: "deflate",
          fileExtension: "zz"
        }
      ],
      orderPreference: ["br", "gz"]
    })
  );

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

server.listen(3000, () => {
  console.log("Server is running at port 3000 ;)");
});
