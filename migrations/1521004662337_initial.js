exports.up = (pgm) => {
  pgm.createTable('alberts_movements', {
    id: { type: 'serial', primaryKey: true },

    latitude: { type: 'double precision', notNull: true },
    longitude: { type: 'double precision', notNull: true },
    accuracy: { type: 'double precision', notNull: false },
    altitude: { type: 'double precision', notNull: false },
    altitude_accuracy: { type: 'double precision', notNull: false },
    heading: { type: 'double precision', notNull: false },
    speed: { type: 'double precision', notNull: false },

    timestamp: { type: 'timestamp', notNull: true },
  });
};
