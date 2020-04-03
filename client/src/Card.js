import React from "react";

const Card = props => {
  const { bg, counter } = props;

  return (
    <div className={`${bg === "light" ? "light" : "dark"} card`}>
      <h1>{counter}</h1>
    </div>
  );
};

export default Card;
