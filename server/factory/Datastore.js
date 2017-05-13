/**
 * Created by danielabrao on 5/13/17.
 */
(function () {
    "use strict";

    var Datastore = require("@google-cloud/datastore");
    module.exports = function (configs) {
        var datastoreClient = new Datastore({
            "projectId": configs.projectId || "junglebadger-166816",
            "keyFilename": configs.secretPath || "./client-secret.json"
        });

        return {
            "saveData": function (intent, data) {
                return new Promise(function (resolve, reject) {
                    var key = datastoreClient.key(intent);
                    datastoreClient.save({
                        "key": key,
                        "data": data
                    }).then(function (response) {
                        resolve(response);
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            }
        };

    };


}());
