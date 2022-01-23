import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from './../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    if (this.props.match.params.id === 'new') return;

    const movie = getMovie(this.props.match.params.id);
    console.log(movie);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  doSubmit = () => {
    // call api
    saveMovie(this.state.data);

    this.props.history.replace('/movies');
    console.log(this.props.history);
  }

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit} >
          {this.renderInput("title", "Title")}
          {this.renderInputSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>

      </div>
    );
  }
}

export default MovieForm;

