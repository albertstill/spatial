const db = require('./db.js');

module.exports = {
  async addPosition({
    timestamp,
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
  }) {
    await db.query(
      `
        INSERT INTO alberts_movements(
          timestamp,
          latitude,
          longitude,
          accuracy,
          altitude,
          altitude_accuracy,
          heading,
          speed
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        timestamp,
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed,
      ],
    );

    return true;
  },
  async positions() {
    const positionsQuery = await db.query('SELECT * FROM alberts_movements');

    return positionsQuery.rows;
  },
};
