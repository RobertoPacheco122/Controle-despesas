const path = require("path");

module.exports = {
  entry: "./assets/js/script.js",
  output: {
    path: path.resolve(__dirname, "./assets/js"),
    filename: "script.min.js",
  },
};
