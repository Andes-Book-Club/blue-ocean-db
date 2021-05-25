const db = require('./connection.js');
//test query for users table
// will be stored / retrieved as result of user login
const insertUser = db.query(`
  INSERT INTO
    users (
      email,
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
// insertBook --> result of
const insertBook = db.query(`
  INSERT INTO
    books (
      bookId,
      title,
      publisher,
      searchInfo,
      pageCount,
      maturityRating,
      thumbnail,
      buyLink
      )
  VALUES (
    '0351VlMDqGEC',
    'Being And Time',
    'SUNY Books',
    'What is the meaning of being?&quot; This is the central question of Martin Heidegger&#39;s profoundly important work, in which the great philosopher seeks to explain the basic problems of existence.',
    608,
    'NOT_MATURE',
    'http://books.google.com/books/content?id=9oc2BnZMCZgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'https://play.google.com/store/books/details?id=ZWDdDwAAQBAJ&rdid=book-ZWDdDwAAQBAJ&rdot=1&source=gbs_api'
  )`
);

const insertAuthor = db.query(`
  INSERT INTO
    authors (
      authorName
      )
  VALUES (
    'Martin Heidegger'
  )`
);

const insertQuestion = db.query(`
  INSERT INTO
    questions (
      createdBy,
      upvotes,
      downvotes,
      questionBody,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer
  )
  VALUES (
    1,
    0,
    3,
    'What does Heidegger describe as: Being there. Beings for which being is an issue and is mine.',
    'Heidegger was a nut',
    'Kafka ftw',
    'Dasein',
    'Being in Time',
    3
  )`
);

const insertUserQuestion = db.query(`
  INSERT INTO
    userQuestions (
      userId,
      questionId,
      isCorrect,
      userRating
  )
  VALUES (
    1,
    4,
    true,
    1
  )`
);