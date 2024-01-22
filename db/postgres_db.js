// handles interaction with postgresdb for users
const path = require('path')
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env')
});
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

async function getAllUsers() {
  try {
    const response = await pool.query('SELECT * FROM users');
    users = response['rows'];
    return users // returning an array of objects
  } catch (err) {
    console.error(err);
  }
}

async function getUser(id) {
  const text = 'SELECT * FROM users WHERE id = $1'
  const value = [id]
  try {
    const response = await pool.query(text, value);
    user = response['rows'];
    if (user.length == 0) {
      return {error: "No user with provided id."}
    }

    return user[0] // returning an object
  } catch (err) {
    console.error(err);
  }
}

async function findUser(username) {
  const text = 'SELECT * FROM users WHERE name = $1';
  const value = [username]
  try {
    const response = await pool.query(text, value);
    user = response['rows'];
    return user[0] // returning an object
  } catch (err) {
    console.error(err);
  }
}

async function insertUser(username) {
  const text = 'INSERT INTO users (name) VALUES ($1)';
  const value = [username]
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err);
  }
}

async function updateUser(id, username) {
  const text = 'UPDATE users SET name=$1 WHERE id=$2';
  const values = [username, id];
  try {
    await pool.query(text, values);
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser(id) {
  const text = 'DELETE FROM users WHERE id=$1';
  const value = [id];
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  findUser,
};