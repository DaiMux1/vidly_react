import React, { Component } from 'react';
import Movie from './movie';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    // movies_page: getMovies().slice(0, 4),
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  }

  handlePageChange = (page) => {

    this.setState({ currentPage: page })
  }

  render() {
    const count = this.state.movies.length;
    if (count === 0) return <p>There are no movies in database</p>

    const { currentPage, pageSize, movies: allMovies } = this.state

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <span>Showing {count} movies in the database.</span>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(m =>
              <Movie
                key={m._id}
                movie={m}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
              />
            )}

          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;