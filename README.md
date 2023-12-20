# Introduction

- This project uses football data as an example data set
- The files in the `src/denormalized` directory are a fully implemented example of working with a denormalized data set
- Running `node src/denormalized/index.js` from the root directory does the following:
  - loads data from the json files in the `dataImport` directory
  - opens a database connection to a sqlite file
  - creates tables for `Country`, `League`, `Team`, `Player` using the sql files in `src/denormalized/db/sql/bootstrap/tables`
  - creates entries in the `Country`, `League`, `Team`, `Player` tables using the sql files in `src/denormalized/db/sql/bootstrap/entires`
  - queries data from the sqlite database - you should see `{ name: 'England' }` printed to the console

# Exercise

_Bonus points for migrating the javascript files in `src/normalized` to typescript, though this is not required_

## Part 1

- Define a new _normalized_ schema for the `football-normalized.db` database
  - write the SQL CREATE statements necessary in the `src/normalized/db/sql/bootstrap/tables` files to create a normalized version of the data model

## Part 2

- Implement the functions `transformLeagues`, `transformTeams`, `transformPlayers` in `transformCollections.js` that receive the denormalized data and return a normalized version - replacing values from other collections with id-based references
- Implement jest tests in `transformCollections.test.js` to validate the correct behaviour of the transform\* functions
- Add the logic necessary in `src/normalized/loadData.js` to process the collections and utilize the transform\* functions to normalize the data
- write the SQL INSERT statements necessary in the `src/normalized/db/sql/bootstrap/entries` files to insert data in the normalized tables

## Part 3

- Implement the SQL queries required to answer the Question in each of the `query1.sql`, `query2.sql`, `query3.sql` files
