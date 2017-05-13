/**
 * Created by danielabrao on 5/13/17.
 */
(function () {
    "use strict";

    module.exports = function (configs) {
        return [{
            "name": "title",
            "value": configs.title
        }, {
            "name": "body",
            "value": configs.body,
            "excludeFromIndexes": true
        }, {
            "name": "author",
            "value": configs.author
        }, {
            "name": "timestamp",
            "value": Date.now()
        }];
    };

}());
