-- add statement to create normalized Team table
CREATE TABLE team (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    league_id INTEGER,
    FOREIGN KEY (league_id) REFERENCES league(id)
);