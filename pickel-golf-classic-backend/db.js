const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create the users table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        clerk_id TEXT NOT NULL UNIQUE,
        friday BOOLEAN DEFAULT false,
        monday BOOLEAN DEFAULT false,
        shirt TEXT,
        registered BOOLEAN DEFAULT false,
        paid BOOLEAN DEFAULT false
    )
`).catch(err => console.error('Error creating users table:', err.message));

const createUser = async (user) => {
    const { rows } = await pool.query(
        `INSERT INTO users (clerk_id, first_name, last_name, friday, monday, shirt, registered, paid)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (clerk_id) DO UPDATE SET
             first_name = EXCLUDED.first_name,
             last_name = EXCLUDED.last_name,
             friday = EXCLUDED.friday,
             monday = EXCLUDED.monday,
             shirt = EXCLUDED.shirt,
             registered = EXCLUDED.registered,
             paid = EXCLUDED.paid
         RETURNING *`,
        [user.clerkId, user.firstName, user.lastName, user.friday, user.monday, user.shirt, user.registered, user.paid]
    );
    return rows[0];
};

const updateUser = async (user) => {
    const { rows } = await pool.query(
        `INSERT INTO users (clerk_id, first_name, last_name, friday, monday, shirt, registered, paid)
         VALUES ($1, $2, $3, $4, $5, $6, $7, false)
         ON CONFLICT (clerk_id) DO UPDATE SET
             first_name = EXCLUDED.first_name,
             last_name = EXCLUDED.last_name,
             friday = EXCLUDED.friday,
             monday = EXCLUDED.monday,
             shirt = EXCLUDED.shirt,
             registered = EXCLUDED.registered
         RETURNING *`,
        [user.clerkId, user.firstName, user.lastName, user.friday, user.monday, user.shirt, user.registered]
    );
    return rows[0];
};

const getUserById = async (clerkId) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE clerk_id = $1', [clerkId]);
    return rows[0] || null;
};

const getUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
};

const updateUserPaidStatus = async ({ id, paid }) => {
    await pool.query('UPDATE users SET paid = $1 WHERE id = $2', [paid, id]);
    return { id, paid };
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
    createUser,
    updateUser,
    updateUserPaidStatus,
    getUserById,
    getUsers,
    deleteUser,
    pool
};
