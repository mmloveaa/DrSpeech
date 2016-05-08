'use strict';

function Vocabulary() {
    this._catalog = {
        "default": ["Cat", "Experience", "Gender", "Appreciate", "Balloon", "Park"],
        "noun": ["Sheep", "Problem", "Beard", "Murder","Fork"],
        "verb": ["Judge", "Validate", "Think", "Draw", "Start"],
        "adjective": ["Free", "Subtle", "Brilliant", "Adventurous"]
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
