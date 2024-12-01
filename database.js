const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./employees.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            dob TEXT NOT NULL, 
            position TEXT NOT NULL
        )`);
    }
});

module.exports = db;
