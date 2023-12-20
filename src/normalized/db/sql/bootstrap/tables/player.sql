-- add statement to create normalized Player table
CREATE TABLE player (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    goals INTEGER,
    age INTEGER,  
    nationality TEXT,
    team_id INTEGER,
    FOREIGN KEY (team_id) REFERENCES team(id)
);