(function () {
    "use strict";

    module.exports = function (app, dependencies) {

        app.get("/", function (req, res) {
            return res.status(200).send("ois");
        });
    };


}());
