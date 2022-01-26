import http from './httpServices';
import _ from 'lodash'

const apiEndpoint = '/movies';

function movieUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  // update
  if (movie._id) return http.put(movieUrl(movie._id), _.omit(movie, ['_id']))
  // create
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}