// note the timestamp in the filename... used by knex to know what order
// migrations should be run in.

// the .up() function returns a promise (don't forget the "return")... use
// knex.schema.* methods (documented under Schema Builder on knexjs.org) to
// create schema changes.
exports.up = function (knex) {
  // the knex.schema.createTable() method creates a table in the database,
  // then passes an object representing that table to a callback method that
  // we supply. We can then use that table object to create columns. See the
  // knexjs.org documentation under "Schema Builder", under "table".
  return knex.schema.createTable('fruits', (tbl) => {
    // The table.increments() method creates an "identity" column. Database
    // tables almost always have an identity column that allows you to
    // uniquely identify each row. In most cases, the identity column is an
    // integer (32 bit, 64 bit, depends on the database, and could be
    // configurable in some). Sometimes they are a UUID (a.k.a. GUID), which
    // is a globally, or universally (how do they KNOW that???) unique
    // identifier/value. UUIDs are fascinating, worth your time to read up
    // on them... see
    // https://en.wikipedia.org/wiki/Universally_unique_identifier).
    //
    // Note that ".increments()" creates an identifier field that uses an
    // integer (the default size integer for the database in use, which is
    // 32bits for SQLite3). It also places the "unique" constraint, the "not
    // nullable" constraint, and the "autoincrement" constraint on the
    // column. Autoincrement causes the identifier to automatically be
    // assigned when a new record is created, with a value that is ++ the
    // most recently used value for that table.
    tbl.increments('id');
    // Here we create the name field. Knex will create a column of type
    // "varchar" with a maximum size equal to the second parameter. Varchar
    // columns are typically compacted in the database, saving space. So
    // though the maximum size is 128 bytes (as in the example below), the
    // actual storage space used by a record for that column will be the
    // exact size of the value. If it's a 10-character string, then it's 10
    // bytes large, etc.
    //
    // Note the use of the .unique() and .notNullable() methods to place the
    // UNIQUE and NOT NULL constraints on the column.
    tbl.string('name', 128).unique().notNullable();
    tbl.decimal('avgWeightOz').notNullable();
    // Note that booleans may be stored by a database however they choose. A
    // common method is to store them as an integer, with a value of "1"
    // being "true", and "0" bing "false".
    tbl.boolean('delicious');
  });
};

// the .down() method is used with knex migrate:rollback ... your code here
// should put the database back into the same state/shape it was in before the
// .up() method was called. In this case, since .up() adds a table, .down() just
// needs to "drop" (remove/delete) the table. All schema *and* data are removed
// when you drop a table, just fyi.
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('fruits');
};
