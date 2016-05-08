'use strict';

function Vocabulary() {
    this._catalog = {
        "default": ["sheep", "Encyclopedia", "Experience", "gender", "appreciate", "murder", "Seen", "crisps", "assailant"]
    }
}

Vocabulary.prototype.getRandomWord = function () {
    var category = this._catalog["default"];
    var length = category.length;
    return category[this.random(length)];
};

Vocabulary.prototype.random = function (length) {
    return Math.floor(Math.random() * length) + 1;
};

module.exports = Vocabulary;
