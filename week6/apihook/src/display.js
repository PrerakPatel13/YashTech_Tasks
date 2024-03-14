import React from 'react';
import JokeFetch from './useFetch';

const JokeComponent = () => {
  const { loading, error, joke } = JokeFetch();

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Joke:', joke);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!joke) {
    console.log('No joke available.');
    return <div>No joke available.</div>;
  }

  return (
    <div>
      <h2>Joke of the day:</h2>
      <p>{joke}</p>
    </div>
  );
};

export default JokeComponent;
