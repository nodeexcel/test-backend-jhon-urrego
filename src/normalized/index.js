const path = require("path");
const {
  initDatabaseConnection,
  closeDatabaseConnection,
  createTables,
  insertEntries,
  queryDatabase,
} = require("../db");
const { loadTextFile, deleteFileIfExists } = require("../fileUtils");
const { loadCollectionsCreateTableSql, loadCollectionsInsertEntries } = require("./loadData");

const dbPath = path.join(__dirname, "db", "football-normalized.db");
deleteFileIfExists(dbPath);

const collectionNames = ["country", "league", "team", "player"];
const collectionsTableSql = loadCollectionsCreateTableSql(collectionNames);
const collectionsEntries = loadCollectionsInsertEntries(collectionNames);

const queries = ["query1", "query2", "query3"].map((queryName) =>
  loadTextFile([__dirname, "db", "sql", "queries", `${queryName}.sql`])
);

initDatabaseConnection(dbPath);

createTables(collectionsTableSql);
insertEntries(collectionsEntries);

// Part 3
queryDatabase(queries[0]);
queryDatabase(queries[1]);
queryDatabase(queries[2]);
closeDatabaseConnection();
