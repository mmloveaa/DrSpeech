'use strict';

function Vocabulary() {
    this._catalog = {
        "default": ["Sheep", "Query", "Experience", "Gender", "Appreciate", "Murder", "Seen", "Fork", "Start"]
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
