import React, { Component } from 'react';
import Like from './common/like';

const Movie = ({ movie, onDelete, onLike }) => {
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <Like 
          liked={movie.liked}
          onLike={onLike}
          movie={movie}
        />
      </td>
      <td><button onClick={() => onDelete(movie)} className='btn btn-danger'>delete</button></td>
    </tr>
  );
}

export default Movie;