// for every league, replace any value referenced from the countries collections with an id-reference
exports.transformLeagues = (leagues, countries) => {
    console.log({ "leagues": leagues, "countries": countries, "transformLeagues": "transformLeagues" })
    const countryIdMap = new Map(countries.map(country => [country.name, country.id]));
    return leagues.map(league => {
        return {
            ...league,
            country_id: countryIdMap.get(league.country)
        };
    });
};

// for every team, replace any value referenced from the leagues collections with an id-reference
exports.transformTeams = (teams, leagues) => {
    console.log({ "leagues": leagues, "teams": teams, "transformTeams": "transformTeams" })
    const leagueIdMap = new Map(leagues.map(league => [league.name, league.id]));
    return teams.map(team => {
        return {
            ...team,
            league_id: leagueIdMap.get(team.league)
        };
    });
};
// for every player, replace any value referenced from the teams and countries collections with an id-reference
exports.transformPlayers = (players, teams) => {
    console.log({ "players": players, "teams": teams, "transformPlayers": "transformPlayers" })
    const teamIdMap = new Map(teams.map(team => [team.name, team.id]));
    return players.map(player => {
        return {
            ...player,
            team_id: teamIdMap.get(player.team)
        };
    });
};
