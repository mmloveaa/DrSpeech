'use strict';

function Vocabulary() {
    this._catalog = {
        "default": ["cat", "experience", "gender", "appreciate", "balloon", "park"],
        "noun": ["sheep", "problem", "beard", "murder","fork"],
        "verb": ["jump", "validate", "think", "draw", "start"],
        "adjective": ["free", "subtle", "brilliant", "adventurous"]
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
