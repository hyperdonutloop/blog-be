
exports.up = function(knex) {
  return knex.schema.createTable('posts', tbl => {
    tbl.increments();
    tbl
      .text('title')
      .notNullable();
    tbl
      .text('body')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
