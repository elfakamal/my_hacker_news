import React from 'react';

const Story = ({pos, title, url, score, author, date, descendants}) => (
  <div className="alert alert-secondary text-left">
    <a href={ url } className="alert-heading">#{ pos + 1 } - { title }</a>
    <br />
    { score } points by { author } | { formattedDate(date) } | { descendants } comments
  </div>
);

const formattedDate = (unixTime) => {
  const date = new Date(parseInt(unixTime, 10) * 1000);
  return `${date.toISOString().slice(0, 10)} at ${date.toISOString().slice(11, 16)}`;
};

export default Story;
