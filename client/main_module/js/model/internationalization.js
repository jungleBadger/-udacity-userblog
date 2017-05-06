(function () {
    "use strict";

    var languages = {
        "pt": {},
        "en": {},
        "es": {}
    };

    module.exports = function (countryCode) {
        return languages[countryCode] || languages.en;
    };
}());