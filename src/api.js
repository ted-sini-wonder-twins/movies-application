module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  editMovies: (id, movie) => {
    return fetch(`/api/movies/${id}`, {
      method: 'Patch',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
        .then(response => response.json());
  },
  postMovies: (movie) => {
    return fetch('/api/movies',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
        .then(response => response.json());
  },
  deleteMovie: (id) => {
    return fetch(`/api/movies/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }
}


