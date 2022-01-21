import React, { Component } from 'react';

// sortColumn: obj
// onSort: func
// columns: array
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === 'desc' ? 'asc' : 'desc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn)
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.path) return null;

    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }


  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key} onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;