/**
 * Created by danielabrao on 3/27/17.
 */
(function () {
    "use strict";

    module.exports = function (window) {

        var urls = {
            "urlModel": "/pathToAPI"
        };

        if (!window.Promise) {
            window.Promise = require("promise-polyfill");
        }

        return {
            "setUrl": function (url, type) {
                urls[type] = url;
            },
            "getUrl": function (type) {
                return urls[type] || "Invalid URL requested";
            },
            "postModel": function (requestParams) {
                return new Promise(function (resolve, reject) {
                    if (!requestParams) {
                        return reject("Can not proceed without credentials");
                    }

                    if (window.XMLHttpRequest) {
                        var xhttp = new window.XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (xhttp.readyState === 4) {
                                if (xhttp.status === 200 || xhttp.status === 201) {
                                    if (xhttp.responseText) {
                                        try {
                                            resolve(JSON.parse(xhttp.responseText));
                                        } catch (e) {
                                            resolve(xhttp.responseText);
                                        }
                                    } else {
                                        reject("An error occurred: Empty response");
                                    }

                                } else {
                                    reject(["An error occurred:", xhttp.responseText].join());
                                }
                            }
                        };

                        xhttp.open("POST", urls.urlModel);
                        xhttp.setRequestHeader("content-type", "application/json");
                        xhttp.send(JSON.stringify(requestParams));

                    } else {
                        reject("AJAX Calls not supported on this browser");
                    }
                });
            },
            "getModel": function () {
                return new Promise(function (resolve, reject) {

                    if (window.XMLHttpRequest) {

                        var xhttp = new window.XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (xhttp.readyState === 4) {
                                if (xhttp.status === 200) {
                                    if (xhttp.responseText) {
                                        try {
                                            resolve(JSON.parse(xhttp.responseText));
                                        } catch (e) {
                                            resolve(xhttp.responseText);
                                        }
                                    } else {
                                        reject("An error occurred: Empty response");
                                    }

                                } else {
                                    reject(["An error occurred: ", xhttp.responseText].join());
                                }
                            }
                        };

                        xhttp.open("GET", urls.urlModel);
                        xhttp.send();
                    } else {
                        reject("AJAX Calls not supported on this browser");
                    }
                });
            }
        };
    };

}());