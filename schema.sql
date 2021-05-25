DROP DATABASE andes;
CREATE DATABASE andes;
\c andes;

CREATE TYPE matRates AS ENUM ('MATURE', 'NOT_MATURE');

CREATE TABLE books (
  bookId varchar(30) PRIMARY KEY,
  title varchar(200),
  publisher varchar(100),
  searchInfo varchar(200),
  pageCount int,
  maturityRating matRates,
  thumbnail varchar(1000),
  buyLink varchar(1000)
);

CREATE TABLE authors (
  authorId SERIAL PRIMARY KEY,
  authorName varchar(100)
);

CREATE TABLE authorsBooks (
  id SERIAL PRIMARY KEY,
  authorId int references authors(authorId),
  bookId varchar(30) references books(bookId)
);

CREATE TABLE categories (
  categoryId SERIAL PRIMARY KEY,
  categoryName varchar(100)
);

CREATE TABLE bookCategories (
  id SERIAL PRIMARY KEY,
  categoryId int references categories(categoryId),
  bookId varchar(30) references books(bookId)
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
  id SERIAL PRIMARY KEY,
  userId int references users(userID),
  bookId varchar(30) references books(bookId),
  addedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE userQuestions (
  id SERIAL PRIMARY KEY,
  userId int references users(userID),
  questionId int references questions(questionId),
  answeredAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  isCorrect boolean,
  userRating int,
  CHECK (userRating BETWEEN -1 AND 1)
);

CREATE INDEX ON books (bookId);
CREATE INDEX ON authors (authorId);
CREATE INDEX ON authorsBooks (id);
CREATE INDEX ON categories (categoryId);
CREATE INDEX ON bookCategories (id);
CREATE INDEX ON users (userId);
CREATE INDEX ON users (email);
CREATE INDEX ON questions (questionId);
CREATE INDEX ON userBooks (userId);
CREATE INDEX ON userQuestions (id);
