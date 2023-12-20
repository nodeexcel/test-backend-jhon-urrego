const sqlite3 = require("sqlite3").verbose();

let db;

exports.initDatabaseConnection = (dbPath) => {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  });

  db.run("PRAGMA foreign_keys=ON;");
};

exports.closeDatabaseConnection = () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

exports.createTables = (collectionsTableSql) => {
  for (const tableSql of collectionsTableSql) {
    db.run(tableSql, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  }
};

exports.insertEntries = (collectionsEntries) => {
  for (const collectionEntries of collectionsEntries) {
    db.serialize(() => {
      for (const entryValues of collectionEntries.entriesValues) {
        db.run(collectionEntries.sql, entryValues, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });
      }
    });
  }
};

exports.queryDatabase = (sql) => {
  db.each(sql, (err, row) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(row);
  });
};
