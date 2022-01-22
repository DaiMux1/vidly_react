import React, { Component } from 'react';

const MovieDetail = ({ match, history }) => {
  return (
    <div className="">
      <h1>Movie Detail - {match.params.id} </h1>
      <button className='btn btn-primary' onClick={() => history.replace('/movies')}>Save</button>
    </div>
  );
}

export default MovieDetail;