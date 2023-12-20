const fs = require("fs");
const path = require("path");

exports.loadTextFile = (pathEntries) => fs.readFileSync(path.join(...pathEntries)).toString();

exports.loadJson = (baseDirectory, collectionName) =>
  require(path.join(baseDirectory, "..", "..", "dataImport", `${collectionName}.json`));

exports.deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
