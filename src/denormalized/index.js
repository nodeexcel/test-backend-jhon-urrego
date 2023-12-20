const path = require("path");
const { deleteFileIfExists } = require("../fileUtils");
const {
  initDatabaseConnection,
  closeDatabaseConnection,
  createTables,
  insertEntries,
  queryDatabase,
} = require("../db");
const { loadCollectionsCreateTableSql, loadCollectionsInsertEntries } = require("./loadData");

const dbPath = path.join(__dirname, "db", "football-denormalized.db");
deleteFileIfExists(dbPath);

const collectionNames = ["country", "league", "team", "player"];
const collectionsTableSql = loadCollectionsCreateTableSql(collectionNames);
const collectionsEntries = loadCollectionsInsertEntries(collectionNames);

initDatabaseConnection(dbPath);
createTables(collectionsTableSql);
insertEntries(collectionsEntries);
queryDatabase(`SELECT name FROM Country WHERE id = 1`);
closeDatabaseConnection();
