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
            "saveData": function (entity, data) {
                return new Promise(function (resolve, reject) {
                    if (entity && typeof data === "object") {
                        var key = datastoreClient.key(entity);
                        datastoreClient.save({
                            "key": key,
                            "data": data
                        }).then(function (response) {
                            resolve(response);
                        }).catch(function (err) {
                            reject(err);
                        });
                    } else {
                        throw new Error("Can not proceed without entity and payload");
                    }

                });
            },
            "listData": function (entity, key) {
                return new Promise(function (resolve, reject) {
                    if (entity && key) {
                        var query = datastoreClient.createQuery(entity);
                        query.filter(key, ">", null);
                        query.order(key, {
                            "descending": true
                        });
                        datastoreClient.runQuery(query).then(function (items) {
                            resolve(items);
                        }).catch(function (err) {
                            reject(err);
                        });
                    } else {
                        throw new Error("Can not proceed without entity and search key");
                    }
                });
            },
            "queryData": function (entity, queryFilters) {
                return new Promise(function (resolve, reject) {
                    if (entity && (queryFilters && queryFilters.length)) {
                        var query = datastoreClient.createQuery(entity);
                        resolve();
                        reject(err);
                    } else {
                        throw new Error("Can not proceed without entity");
                    }

                });
            }
        };

    };


}());
