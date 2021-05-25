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
      )
    ON CONFLICT DO NOTHING;`
  );
}

insertUser('Al', 'Alberts');
insertUser('Burt', 'Brooks');
insertUser('Curtis', 'Calloway');
insertUser('Don', 'Deere');
insertUser('Everett', 'Elm');
insertUser('Fran', 'Finch');
insertUser('George', 'Gregg');
insertBook('cyberiad');
insertBook('a gentleman in moscow');
insertBook('to kill a mockingbird');
insertBook('mycellium running');
insertBook('mistborn');
insertBook('overstory');
insertBook('flowers for algernon');

function insertQuestion(userId, upvotes, downvotes, questionBody, answer1, answer2, answer3, answer4, correctAnswer, bookId) {
  return db.query(`
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
      correctAnswer,
      bookId
    )
    VALUES (
      ${userId},
      ${upvotes},
      ${downvotes},
      $$${questionBody}$$,
      $$${answer1}$$,
      $$${answer2}$$,
      $$${answer3}$$,
      $$${answer4}$$,
      ${correctAnswer},
      $$${bookId}$$
    )`
  );
}
setTimeout( () => {

  insertQuestion(1, 0, 3, 'Where did the chicken go?', 'Down', 'Up', 'Across the road', 'Vertical', 3, 'qtsTH7ekvVYC');
  insertQuestion(2, 4, 2, 'What is the stipe of the mushroom?', 'The Teeth', 'The Mycelium', 'The Mycorhizae', 'The stalk', 4, 'qtsTH7ekvVYC');
  insertQuestion(3, 0, 3, 'What is the largest organizm in the world?', 'Whale', 'Mushroom', 'Extinct Shark', 'Vertical', 2, 'qtsTH7ekvVYC');

}, 1000);

function insertUserQuestions(userId, questionId, isCorrect, selectedAnswer, userRating) {
  return db.query(`
    INSERT INTO
    userAnswers (
        userId,
        questionId,
        isCorrect,
        selectedAnswer,
        userRating
      )
    VALUES (
      ${userId},
      ${questionId},
      ${isCorrect},
      ${selectedAnswer},
      ${userRating}
    )`
  )
}

setTimeout( () => {

  insertUserQuestions(1, 1, false, 2, 1);
  insertUserQuestions(2, 2, false, 2, -1);
  insertUserQuestions(3, 3, true, 2, 1);

}, 2000);
