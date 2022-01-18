import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const APIBaseUrl = 'http://localhost:3003';

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    Axios.get(`${APIBaseUrl}/api/movies`).then((response) => {
      setMovieReviewList(response.data);
    });
  };

  const submitReview = () => {
    Axios.post(`${APIBaseUrl}/api/save`, {
      movieName: movieName,
      movieReview: review,
    }).then(res => {
      if (res.status === 200) {
        console.log('Ok response from save')
        const { data } = res.data;
        if (data) {
          console.log('Updating movie list');
          setMovieReviewList([...movieReviewList, data]);
        } else {
          console.log('No data');
          // TODO : The server returned an OK HTTP status but no data.
        }
      } else {
        console.error('Error from save');
        // TODO : The server returned a non OK (E.g 403, 404, etc) HTTP status.
      }
    }).catch(err => {
      // TODO : Handle the error. Remove console logging.
      console.error(err);
    });
  };

  const deleteReview = (movieToDelete) => {
    // TODO : Send id rather than name.
    Axios.delete(`${APIBaseUrl}/api/delete/${movieToDelete}`)
      .then(getAllMovies());
  };

  const updateReview = (movieToUpdate) => {
    Axios.put(`${APIBaseUrl}/api/update`, {
      movieName: movieToUpdate,
      movieReview: newReview,
    }).then((response) => {
      if (response.status === 200) {
        setNewReview("");
        // setMovieReviewList([...movieReviewList, response.data]);
      } else {
        console.error('Error when updating a review')
      }
    });
  };


  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }}></input>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => {
          setReview(e.target.value)
        }}></input>
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              <button onClick={() => { deleteReview(val.movieName) }}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => { setNewReview(e.target.value) }}></input>
              <button onClick={() => { updateReview(val.movieName) }}>Update</button>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;