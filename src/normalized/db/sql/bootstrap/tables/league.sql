-- add statement to create normalized League table
CREATE TABLE league (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    rank INTEGER,
    country_id TEXT,
    FOREIGN KEY (country_id) REFERENCES country(id)
);
