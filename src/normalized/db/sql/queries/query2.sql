-- Question: How many goals were scored across the top two leagues (rank ≤ 2) in English football?

SELECT SUM(p.goals) AS TotalGoals
FROM player p
JOIN team t ON p.team_id = t.id
JOIN league l ON t.league_id = l.id
JOIN country c ON l.country_id = c.id
WHERE c.name = 'England' AND l.rank <= 2;

-- Expected Result: { TotalGoals: 63 }