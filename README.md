# react-playground-node

- React
- Express
- Node.js
- MySQL

## Setup - Server

Start the database
```
mysql.server start
```

Create a new database
```
CREATE DATABASE `MovieDB`
```

Create the database schema 
```
CREATE TABLE `movie_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movieName` varchar(200) NOT NULL,
  `movieReview` text NOT NULL,
  PRIMARY KEY (`id`)
)
```

Update database config in index.js\
E.g
```
const db = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'MovieDB'
});
```

Start the API
```
npm install
npm start
```

## Setup - Client

In the client project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

