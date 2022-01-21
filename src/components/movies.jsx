import React, { Component } from 'react';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import _ from "lodash";
import MoviesTable from './moviesTable';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: "All Genres" }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

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

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedDate = () => {
    const { currentPage, pageSize, movies: allMovies,
      genres, selectedGenre, sortColumn }
      = this.state;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { count: filtered.length, data: movies }
  }

  render() {

    const { currentPage, pageSize, movies: allMovies,
      genres, selectedGenre, sortColumn }
      = this.state;

    const { count, data: movies } = this.getPagedDate();
    // if (count === 0) return <p>There are no movies in database</p>

    return (
      <React.Fragment>
        <div className='d-flex p-2'>
          <div>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>

          <div>
            <span>Showing {count} movies in the database.</span>
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;