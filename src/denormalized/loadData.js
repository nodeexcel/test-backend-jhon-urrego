const { loadTextFile, loadJson } = require("../fileUtils");

exports.loadCollectionsCreateTableSql = (collectionNames) =>
  collectionNames.map((collectionName) =>
    loadTextFile([__dirname, "db", "sql", "bootstrap", "tables", `${collectionName}.sql`])
  );

exports.loadCollectionsInsertEntries = (collectionNames) =>
  collectionNames.map((collectionName) => ({
    name: collectionName,
    sql: loadTextFile([__dirname, "db", "sql", "bootstrap", "entries", `${collectionName}.sql`]),
    entriesValues: loadJson(__dirname, collectionName).map((collectionData) => Object.values(collectionData)),
  }));
