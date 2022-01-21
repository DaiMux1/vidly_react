import React, { Component } from 'react';

const ListGroup = (props) => {
  const { items, valueProperty, textProperty, onItemSelect, selectedItem } = props;

  return (
    <ul className="list-group mr-3">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={selectedItem === item ? "list-group-item active" : "list-group-item"}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup;