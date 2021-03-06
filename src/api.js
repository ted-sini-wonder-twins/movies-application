module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  editMovies: (id, movie) => {
    return fetch("/api/movies/" + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
        .then(response => response.json());
  },
  postMovies: (title,rating,genre) => {
    let newMovie = {title: title, rating: rating, genre: genre, img:"img/coming-soon.png"};
    return fetch('/api/movies',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie)
    }).then( response => response.json());
  },
  deleteMovies: (id) => {
    return fetch(`/api/movies/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }
};


