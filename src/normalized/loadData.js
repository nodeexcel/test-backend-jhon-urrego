const { transformLeagues, transformTeams, transformPlayers } = require("./transformCollections");
const { loadTextFile, loadJson } = require("../fileUtils");

exports.loadCollectionsCreateTableSql = (collectionNames) =>
  collectionNames.map((collectionName) =>
    loadTextFile([__dirname, "db", "sql", "bootstrap", "tables", `${collectionName}.sql`])
  );

// exports.loadCollectionsInsertEntries = (collectionNames) => {
//   const collectionsData = collectionNames.map((collectionName) => ({
//     name: collectionName,
//     data: loadJson(__dirname, collectionName),
//   }));
// Create a new array of objects named `collectionsInsertEntries`, with the same length as the `collectionsData` array
// Each object in the array should have the form `{ name: string, sql: string, entriesValues: (string|number)[] }`
// The `name` property should be the collection name
// The `sql` property should be the text from the corresponding `db/sql/bootstrap/entries/<collection>.sql` file
// The `entriesValues` property should be the Object values from the normalized data
// - write code to process the collection data and utilize the `transform*` functions to normalize it
exports.loadCollectionsInsertEntries = (collectionNames) => {
  // Load collection data
  const collectionsData = collectionNames.map((collectionName) => ({
    name: collectionName,
    data: loadJson(__dirname, collectionName),
  }));

  // Load additional data for transformations
  const countries = loadJson(__dirname, 'country');
  const leagues = loadJson(__dirname, 'league');
  const teams = collectionsData.find(c => c.name === 'team').data;

  let collectionsInsertEntries = collectionsData.map(collection => {
    let normalizedData;

    // Normalize data based on collection type
    switch (collection.name) {
      case 'league':
        normalizedData = transformLeagues(collection.data, countries);
        break;
      case 'team':
        normalizedData = transformTeams(collection.data, leagues);
        break;
      case 'player':
        normalizedData = transformPlayers(collection.data, teams, countries);
        break;
      default:
        normalizedData = collection.data;
    }

    // Load the SQL template for INSERT statements
    const sql = loadTextFile([__dirname, "db", "sql", "bootstrap", "entries", `${collection.name}.sql`]);

    // Map the values for INSERT statements
    const entriesValues = normalizedData.map(entry => {
      if (collection.name === 'league') {
        return [entry.id, entry.name, entry.rank, entry.country_id];
      } else if (collection.name === 'team') {
        return [entry.id, entry.name, entry.city, entry.league_id];
      } else if (collection.name === 'player') {
        // Updated to match the Player table schema
        return [entry.id, entry.name, entry.goals, entry.age, entry.nationality, entry.team_id];
      } else {
        return Object.values(entry);
      }
    });

    return {
      name: collection.name,
      sql: sql,
      entriesValues: entriesValues
    };
  });

  return collectionsInsertEntries;
};


