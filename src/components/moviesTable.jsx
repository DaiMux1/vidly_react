import React, { Component } from 'react';
import Movie from './movie';

class MoviesTable extends Component {
  raiseSort = path => {
    const sortColumn = {...this.state.sortColumn};
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order ==='desc' ? 'asc' : 'desc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn)
  }

  render() {
    const { movies, onDelete, onLike } = this.props;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
            <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
            <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
            <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(m =>
            <Movie
              key={m._id}
              movie={m}
              onDelete={onDelete}
              onLike={onLike}
            />
          )}

        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
