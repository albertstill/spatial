exports.up = (pgm) => {
  pgm.createTable('alberts_movements', {
    id: { type: 'serial', primaryKey: true },
    latitude: { type: 'double precision', notNull: true },
    longitude: { type: 'double precision', notNull: true },
  });
};
