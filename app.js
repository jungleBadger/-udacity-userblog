/**
 * Created by danielabrao on 1/20/17.
 */
(function () {
    "use strict";
    var express = require("express"),
        app = express(),
        path = require("path"),
        fs = require("fs"),
        engines = require("consolidate"),
        ejs = require("ejs"),
        request = require("request"),
        bodyParser = require("body-parser"),
        compress = require("compression"),
        server = require("http").createServer(app),
        morgan = require("morgan");

    // passport = require("passport");

    app.use(compress());
    app.use(express["static"](path.join(__dirname, "./client/")));
    app.set("views", __dirname + "/client/");
    app.engine("html", engines.ejs);
    app.set("view engine", "html");
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({limit: "50mb"}));


    // require("./server/controller/passport")(passport);
    require("./server/routes/index")(app, {});

    app.get("/oi", function (req, res) {
        return res.status(200).render("./main_module/index");
    });

    server.listen(process.env.PORT || process.env.port || 8001, function () {
        console.log(["App running on:", process.env.PORT || 8001].join(" "));
    });

}());
