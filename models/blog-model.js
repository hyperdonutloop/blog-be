const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('posts')
}

function findBy(filter) {
  return db('posts').where(filter);
}

async function add(post) {
  const [id] = await db('posts').insert(post);

  return findById(id);
}

function findById(id) {
  return db('posts')
  .where({ id })
  .first();
}

async function update(post, id) {
  await db('posts')
  .where({ id: id })
  .update(post);

  const [updatedPost] = await db('posts')
  .where({ id: id })
  .returning('*');
  
  return updatedPost;
}

function remove(id) {
  return db('posts')
    .where({ id: id })
    .delete();
}