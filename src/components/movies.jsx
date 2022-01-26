import React, { Component } from 'react';
import Pagination from './common/pagination';
// import { getGenres } from '../services/fakeGenreService';
// import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import { paginate } from '../utils/paginate';
import auth from '../services/authService';
import ListGroup from './common/listGroup';
import _ from "lodash";
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import Search from './common/searchBox';
import { toast } from 'react-toastify';





class Movies extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     movies: [],
  //     genres: [],
  //     currentPage: 1,
  //     pageSize: 4,
  //     sortColumn: { path: 'title', order: 'asc' }
  //   };
  // }

  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
    search: ''
  };

  async componentDidMount() {
    const { data: dataGenres } = await getGenres();
    const genres = [{ _id: '', name: "All Genres" }, ...dataGenres];

    const { data: movies } = await getMovies();

    // const genres = [{ _id: '', name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres })
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {

      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }

  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, search: '' })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  handleSearch = e => {
    const search = e.target.value;
    this.setState({ search, selectedGenre: '', currentPage: 1 });
  }

  getPagedData = () => {
    const { currentPage, pageSize, movies: allMovies,
      genres, selectedGenre, sortColumn, search }
      = this.state;

    // const filtered = [];
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies.filter(m => (new RegExp(search, 'i').test(m.title)));
    // if (selectedGenre) {
    // } else {
    //   filtered = 
    // }

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { count: filtered.length, data: movies }
  }

  render() {

    const { currentPage, pageSize, movies: allMovies,
      genres, selectedGenre, sortColumn }
      = this.state;

    const { count, data: movies } = this.getPagedData();
    const user = auth.getCurrentUser();
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-3'>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>

          <div className='col'>
            {user &&
              <Link className="btn btn-primary" to='/movies/new' >
                New Movie
              </Link>
            }
            <p>Showing {count} movies in the database.</p>
            <Search
              value={this.state.search}
              onSearch={this.handleSearch}
            />

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
      </React.Fragment >
    );
  }
}

export default Movies;