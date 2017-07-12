const fs = require('file-system');
var easy = [];
var normal = [];
var difficult = [];
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

(function buildDifficultyArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length >= 4 && arr[i].length <= 6) {
            easy.push(arr[i]);
        }
        if (arr[i].length >= 6 && arr[i].length <= 8) {
            normal.push(arr[i]);
        }
        if (arr[i].length > 8) {
            difficult.push(arr[i]);
        }
    }
})(words);

module.exports = {
    easy: easy,
    normal: normal,
    difficult: difficult
};