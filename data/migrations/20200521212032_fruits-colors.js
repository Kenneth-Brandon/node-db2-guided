// tbl.string creates a varchar, while tbl.text creates a text column
exports.up = function (knex) {
  return knex.schema.table('fruits', (tbl) => {
    tbl.string('color', 128);
  });
};

// again: .down() must undo exactly what .up() does
exports.down = function (knex) {
  return knex.schema.table('fruits', (tbl) => {
    tbl.dropColumn('color');
  });
};
