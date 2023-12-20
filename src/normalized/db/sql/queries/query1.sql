-- Question: In which league does the youngest player to score more than 10 goals play?

SELECT l.name AS league_name
FROM player p
JOIN team t ON p.team_id = t.id
JOIN league l ON t.league_id = l.id
WHERE p.goals > 10
ORDER BY p.age ASC
LIMIT 1;

-- Expected Result: { name: 'Premier League' }