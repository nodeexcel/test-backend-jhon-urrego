const { expect } = require("chai");
const { transformLeagues, transformTeams, transformPlayers } = require("./transformCollections");

// Example mock data
const countries = [
  { id: 1, name: 'England' },
  { id: 2, name: 'Colombia' },
  { id: 3, name: 'Spain' },
  { id: 4, name: 'Portugal' },
  { id: 5, name: 'France' }
];

const leagues = [
  { id: 1, name: 'Premier League', country: 'England', rank: 1 },
  { id: 2, name: 'Championship', country: 'England', rank: 2 },
  { id: 3, name: 'EFL League 1', country: 'England', rank: 3 },
  {
    id: 4,
    name: 'Categoría Primera A',
    country: 'Colombia',
    rank: 1
  },
  { id: 5, name: 'La Liga', country: 'Spain', rank: 1 }
];

const teams = [
  { id: 1, name: 'Manchester United', league: 'Premier League' },
  { id: 2, name: 'Newcastle United', league: 'Premier League' },
  { id: 3, name: 'Brentford', league: 'Championship' },
  { id: 4, name: 'Oxford United', league: 'EFL League 1' },
  { id: 5, name: 'Atletico Nacional', league: 'Categoría Primera A' },
  { id: 6, name: 'Millonarios', league: 'Categoría Primera A' },
  { id: 7, name: 'Real Madrid', league: 'La Liga' },
  { id: 8, name: 'Barcelona', league: 'La Liga' }
];

const players = [
  {
    id: 1,
    name: 'Marcus Rashford',
    team: 'Manchester United',
    nationality: 'England',
    age: 23,
    goals: 11
  },
  {
    id: 2,
    name: 'Bruno Fernandes',
    team: 'Manchester United',
    nationality: 'Portugal',
    age: 26,
    goals: 18
  },
  {
    id: 3,
    name: 'Allan Saint-Maximin',
    team: 'Newcastle United',
    nationality: 'France',
    age: 24,
    goals: 3
  },
  {
    id: 4,
    name: 'Ivan Toney',
    team: 'Brentford',
    nationality: 'England',
    age: 25,
    goals: 31
  },
  {
    id: 5,
    name: 'Matt Taylor',
    team: 'Oxford United',
    nationality: 'England',
    age: 31,
    goals: 18
  },
  {
    id: 6,
    name: 'Jarlan Barrera',
    team: 'Atletico Nacional',
    nationality: 'Colombia',
    age: 25,
    goals: 10
  },
  {
    id: 7,
    name: 'Jader Andrés Valencia Mena',
    team: 'Millonarios',
    nationality: 'Colombia',
    age: 21,
    goals: 6
  },
  {
    id: 8,
    name: 'Karim Benzema',
    team: 'Real Madrid',
    nationality: 'France',
    age: 33,
    goals: 23
  },
  {
    id: 9,
    name: 'Antoine Griezmann',
    team: 'Barcelona',
    nationality: 'France',
    age: 30,
    goals: 13
  }
];

test("test transformLeagues", () => {
  const transformed = transformLeagues(leagues, countries);
  expect(transformed[0].country_id).to.equal(1);
  expect(transformed[4].country_id).to.equal(3);
});

test("test transformTeams", () => {
  const transformed = transformTeams(teams, leagues);
  expect(transformed[0].league_id).to.equal(1);
  expect(transformed[7].league_id).to.equal(5);
});

test("test transformPlayers", () => {
  const transformed = transformPlayers(players, teams);
  expect(transformed[0].team_id).to.equal(1);
  expect(transformed[8].team_id).to.equal(8);
});



//Failure test cases 
test("test transformLeagues for incorrect data", () => {
  const incorrectLeagues = [{ name: 'Unknown League', country: 'Unknown Country' }];
  const transformed = transformLeagues(incorrectLeagues, countries);
  expect(transformed[0].country_id).to.not.equal(1);
});

test("test transformTeams for incorrect data", () => {
  const incorrectTeams = [{ name: 'Unknown Team', league: 'Unknown League' }];
  const transformed = transformTeams(incorrectTeams, leagues);
  expect(transformed[0].league_id).to.not.equal(1);
});

test("test transformPlayers for incorrect data", () => {
  const incorrectPlayers = [{ name: 'Unknown Player', team: 'Unknown Team' }];
  const transformed = transformPlayers(incorrectPlayers, teams);
  expect(transformed[0].team_id).to.not.equal(1);
});