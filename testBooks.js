const db = require('./connection.js');

db.query(`
  INSERT INTO
    users (
      googleId,
      firstName,
      lastName,
      profileName,
      profilePhoto
      )
  VALUES (
    'akdshfjhadsf',
    'Bob',
    'Bobbington',
    'BobbityBoo',
    'bobsPic@bob.bob'
  )`
  );


