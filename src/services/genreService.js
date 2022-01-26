import http from './httpServices';

const apiEndpoint = '/genres';
export function getGenres() {
  return http.get(apiEndpoint);
}