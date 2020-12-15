import React from "react";

function Pages({ restaurants, loading }) {
  //   console.log(loading);
  if (!loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {restaurants.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.name}
        </li>
      ))}
    </ul>
  );
}

export default Pages;
