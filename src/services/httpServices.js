import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logServices';

axios.interceptors.response.use(null, error => {
  const expected = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expected) {
    logger.log(error);
    toast.error('An unexpected error occurred.');
  };
  return Promise.reject(error);
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}