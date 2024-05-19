const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todos database.');
});

db.run(`CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    status INTEGER,
    date TEXT
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Todo table created.');
});

module.exports = db;
