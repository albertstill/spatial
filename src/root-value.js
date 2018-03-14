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
        new Date(timestamp),
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
};
