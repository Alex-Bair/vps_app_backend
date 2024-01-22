// validates input before sending request to postgres for user data
const psqlDb = require('./postgres_db.js')

const nonDigitRegexp = /[^\d]/

async function getAll() {
  return await psqlDb.getAllUsers();
}

async function get(id) {
  id = String(id)

  if (nonDigitRegexp.test(id)) {
    console.log('Invalid id!')
    return {error: 'Invalid id'}
  }

  user = await psqlDb.getUser(id);

  if (user === undefined) { return {error: 'No user found'}}

  return user
}

async function create(username) {
  if (await alreadyExists(username)) {
    return {error: "Username already exists"}
  }

  await psqlDb.insertUser(username)
  return {success: "User created!"}
}

async function update(id, username) {
  userCheck = await psqlDb.getUser(id)
  if (userCheck.error) {
    return {error: 'No user with provided id.'}
  }

  await psqlDb.updateUser(id, username)
  return {success: "User updated!"}
}

async function remove(id) {
  userCheck = await psqlDb.getUser(id)
  if (userCheck.error) {
    return {error: 'No user with provided id.'}
  }

  await psqlDb.deleteUser(id)
  return {success: "User deleted!"}
}

async function alreadyExists(username) {
  presentCheck = await psqlDb.findUser(username)
  return presentCheck != undefined
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};

