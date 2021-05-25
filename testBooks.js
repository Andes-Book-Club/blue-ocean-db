const db = require('./connection.js');

const axios = require('axios');

function insertBook(query) {
  bookApi(query)
    .then((apiRes) => {
      // console.log(apiRes.data.items[0]);
      return bookData(apiRes.data.items[0])
    })
    .then((dataObj) => {

      const { userData, authorData, categData, bookCols, bookVals } = dataObj;
      console.log()
      db.query(`
        BEGIN;
          INSERT INTO books (${bookCols})
          VALUES (${bookVals})
          ON CONFLICT DO NOTHING;

          INSERT INTO authorsBooks (authorName, bookId)
          VALUES ${authorData}
          ON CONFLICT DO NOTHING;

          INSERT INTO bookCategories (categoryName, bookId)
          VALUES ${categData}
          ON CONFLICT DO NOTHING;

          INSERT INTO userBooks (userId, bookId)
          VALUES ${userData}
          ON CONFLICT DO NOTHING;
      COMMIT;
      `);
    })
}
function bookApi(query) {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
}
const req = { userId: 1}
function bookData(bookObj) {
  const bookInfo = bookObj.volumeInfo;
  const bookData = {
    bookId: bookObj.id,
    title: bookInfo.title,
    publisher: bookInfo.publisher,
    searchInfo: bookObj.searchInfo.textSnippet,
    pageCount: bookInfo.pageCount,
    maturityRating: bookInfo.maturityRating,
    thumbnail: bookInfo.imageLinks.thumbnail,
    buyLink: bookInfo.buyLink || 'N/A',
  }
  const authorData = bookInfo.authors.map((author) => "('" + author + "','" + bookData.bookId + "')").join(', ');
  const categData = bookInfo.categories.map((category) => "('" + category + "','" + bookData.bookId + "')").join(', ');
  const userData = "(" + req.userId + ", '" + bookData.bookId + "')";
  const bookCols = Object.keys(bookData).join(', ');
  const bookVals = Object.values(bookData).map((val) => typeof val === 'string' ? "$$"+val+"$$": val).join(', ');
  // console.log(bookVals);
  return {
    userData,
    authorData,
    categData,
    bookCols,
    bookVals
  };
};


function insertUser(fName, lName) {
  return db.query(`
  INSERT INTO
  users (
    email,
    firstName,
    lastName,
    profileName,
    profilePhoto
    )
    VALUES (
      '${fName+lName}@gmail.com',
      '${fName}',
      '${lName}',
      'Book ${fName.substring(0,3) + lName.substring(-3)}',
      '${fName}.jpg'
      )`
  );
}

insertUser('James', 'Jameson');
insertBook('cyberiad');
insertBook('a gentleman in moscow');
insertBook('to kill a mockingbird');
insertBook('mycellium running');
insertBook('mistborn');
insertBook('overstory');
insertBook('flowers for algernon');
=======
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