const db = require('./database');

class Todo {
    constructor(name, description, status) {
        this.name = name;
        this.description = description;
        this.status = status ? 1 : 0;
        this.date = new Date();
    }

    save() {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO todos(name, description, status, date)
                    VALUES (?, ?, ?, ?)`, [this.name, this.description, this.status, this.date], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT *
                    FROM todos`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT *
                    FROM todos
                    WHERE id = ?`, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static update(id, name, description, status) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE todos
                    SET name        = ?,
                        description = ?,
                        status      = ?
                    WHERE id = ?`, [name, description, status, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE
                    FROM todos
                    WHERE id = ?`, id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = Todo;
