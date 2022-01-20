import React, { Component } from 'react';

// class Like extends React.Component {
//   getHeartClasses() {
//     let classes = "fa fa-heart";
//     classes += liked ? "" : "-o";
//     return classes;
//   }

//   render() {
//     return <i className={this.getHeartClasses} aria-hidden="true"></i>;
//   }
//}

// export default Like;

const Like = ({movie, liked, onLike }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  // console.log(classes);
  return (
    <i
      onClick={()=>onLike(movie)}
      className={classes}
      style={{ cursor: 'pointer' }}
      aria-hidden="true"/>  
  );
}

export default Like;