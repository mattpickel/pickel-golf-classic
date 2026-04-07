const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbDir = process.env.DB_PATH || __dirname;
const dbPath = path.resolve(dbDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            clerk_id TEXT NOT NULL UNIQUE,
            friday BOOLEAN,
            monday BOOLEAN,
            shirt TEXT,
            registered BOOLEAN,
            paid BOOLEAN
        )
    `);
});

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        // Check if user with given clerk_id exists
        db.get('SELECT * FROM users WHERE clerk_id = ?', [user.clerkId], (err, row) => {
            if (err) {
                return reject(err);
            }
            if (row) {
                // User exists, update their information
                const query = `
                    UPDATE users
                    SET first_name = ?, last_name = ?, friday = ?, monday = ?, shirt = ?, registered = ?, paid = ?
                    WHERE clerk_id = ?
                `;
                const values = [
                    user.firstName,
                    user.lastName,
                    user.friday,
                    user.monday,
                    user.shirt,
                    user.registered,
                    user.paid,
                    user.clerkId
                ];

                db.run(query, values, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        id: row.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        clerkId: user.clerkId,
                        friday: user.friday,
                        monday: user.monday,
                        shirt: user.shirt,
                        registered: user.registered,
                        paid: user.paid
                    });
                });
            } else {
                // User does not exist, insert new user
                const query = `
                    INSERT INTO users (first_name, last_name, clerk_id, friday, monday, shirt, registered, paid)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    user.firstName,
                    user.lastName,
                    user.clerkId,
                    user.friday,
                    user.monday,
                    user.shirt,
                    user.registered,
                    user.paid
                ];

                db.run(query, values, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        id: this.lastID,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        clerkId: user.clerkId,
                        friday: user.friday,
                        monday: user.monday,
                        shirt: user.shirt,
                        registered: user.registered,
                        paid: user.paid
                    });
                });
            }
        });
    });
};

const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (clerk_id, first_name, last_name, friday, monday, shirt, registered, paid)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0)
            ON CONFLICT(clerk_id) DO UPDATE SET
                first_name = excluded.first_name,
                last_name = excluded.last_name,
                friday = excluded.friday,
                monday = excluded.monday,
                shirt = excluded.shirt,
                registered = excluded.registered
        `;
        const values = [
            user.clerkId,
            user.firstName,
            user.lastName,
            user.friday,
            user.monday,
            user.shirt,
            user.registered
        ];

        db.run(query, values, function (err) {
            if (err) {
                return reject(err);
            }
            resolve({
                firstName: user.firstName,
                lastName: user.lastName,
                friday: user.friday,
                monday: user.monday,
                shirt: user.shirt,
                registered: user.registered,
                clerkId: user.clerkId
            });
        });
    });
};

const getUserById = (clerkId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE clerk_id = ?', [clerkId], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const updateUserPaidStatus = ({ id, paid }) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET paid = ? WHERE id = ?';
        db.run(query, [paid, id], function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ id, paid });
        });
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.run(query, id, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = {
    createUser,
    updateUser,
    updateUserPaidStatus,
    getUserById,
    getUsers,
    deleteUser,
    db
};
