-- Question: How many players are there in each Country?

SELECT p.nationality AS name, COUNT(*) AS PlayerCount
FROM player p
GROUP BY p.nationality;


-- Expected Result: 
-- { name: 'England', PlayerCount: 3 }
-- { name: 'Colombia', PlayerCount: 2 }
-- { name: 'Portugal', PlayerCount: 1 }
-- { name: 'France', PlayerCount: 3 }