'use strict';

const { add } = require("bmlaoli-feu-tools");

function ui(result) {
    console.log("ui库，result入参:", result);
    console.log("addUi库:", add(1,2));
}

module.exports = ui;
  