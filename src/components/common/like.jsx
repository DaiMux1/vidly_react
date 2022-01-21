import React from 'react';

const Like = ({ movie, liked, onLike }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  // console.log(classes);
  return (
    <i
      onClick={() => onLike(movie)}
      className={classes}
      style={{ cursor: 'pointer' }}
      aria-hidden="true" />
  );
}

export default Like;