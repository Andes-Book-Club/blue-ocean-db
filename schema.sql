DROP DATABASE andes;
CREATE DATABASE andes;
\c andes;

CREATE TYPE matRates AS ENUM ('MATURE', 'NOT_MATURE');

CREATE TABLE books (
  bookId varchar(30) PRIMARY KEY,
  title varchar(200),
  publisher varchar(100),
  searchInfo varchar(1000),
  pageCount int,
  maturityRating matRates,
  thumbnail varchar(1000),
  buyLink varchar(1000) DEFAULT NULL
);

CREATE TABLE authorsBooks (
  authorName varchar(100),
  bookId varchar(30) references books(bookId),
  PRIMARY KEY (authorName, bookId)
);

CREATE TABLE bookCategories (
  categoryName varchar(100),
  bookId varchar(30) references books(bookId),
  PRIMARY KEY (categoryName, bookId)
);

create TABLE users (
  userId SERIAL PRIMARY KEY,
  email varchar(200),
  firstName varchar(40),
  lastName varchar(40),
  profileName varchar(40),
  profilePhoto varchar(1000)
);

CREATE TABLE questions (
  questionId SERIAL PRIMARY KEY,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  createdBy int references users(userID),
  upvotes int,
  downvotes int,
  questionBody varchar(500),
  answer1 varchar(200),
  answer2 varchar(200),
  answer3 varchar(200),
  answer4 varchar(200),
  correctAnswer int,
  CHECK (correctAnswer BETWEEN 1 AND 4),
  relevance NUMERIC GENERATED ALWAYS AS (upvotes / downvotes) STORED,
  bookId varchar(30) references books(bookId),
  isReported boolean NOT NULL DEFAULT false
);

CREATE TABLE userBooks (
  userId int references users(userID),
  bookId varchar(30) references books(bookId),
  addedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  isCompleted boolean DEFAULT false,
  PRIMARY KEY (userId, bookId)
);

CREATE TABLE userQuestions (
  userId int references users(userID),
  questionId int references questions(questionId),
  answeredAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  isCorrect boolean,
  userRating int,
  CHECK (userRating BETWEEN -1 AND 1),
  PRIMARY KEY (userId, questionId)
);

CREATE INDEX ON books (bookId);
CREATE INDEX ON authorsBooks (bookId);
CREATE INDEX ON bookCategories (bookId);
CREATE INDEX ON users (userId);
CREATE INDEX ON users (email);
CREATE INDEX ON questions (questionId);
CREATE INDEX ON userBooks (userId);
CREATE INDEX ON userQuestions (userId);
