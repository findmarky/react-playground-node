// Middleware.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});

app.use(cors());
app.use(express.json()); // Required to enable Axios to POST Json.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World.');
});

app.get('/api/movies', (req, res) => {
    const sqlSelect = "SELECT id, movieName, movieReview FROM movie_reviews";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.send(result);
    });
});

app.post('/api/save', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";

    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving the movie.');
        } else {
            console.log('Saved a movie to the database.');
            res.send({ movieName: movieName, movieReview: movieReview });
        }
    });
});

app.delete('/api/delete/:movieToDelete', (req, res) => {
    const movieName = req.params.movieToDelete;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, movieName, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error deleting movie ${movieName}`);
        } else {
            console.log(`Deleted movie ${movieName} from the database.`);
            res.send();
        }
    });
});

app.put('/api/update', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Error updating the movie review for movie ${movieName}`);
        } else {
            console.log(`Updated the movie review for movie ${movieName}`);
            res.send({ movieName: movieName, movieReview: movieReview });
        }
    });
});

app.listen(3003, () => {
    console.log("Running on port 3003");
});