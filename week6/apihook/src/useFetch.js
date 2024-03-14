import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';

const useJokeFetch = () => {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true); 

  useEffect(() => {
    return () => {
      isMounted.current = false; 
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) return; 

    setLoading(true);

    const fetchJoke = async () => {
      const options = {
        method: 'GET',
        url: process.env.REACT_APP_API_URL,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
        }
      };

      try {
        const response = await axios.request(options);
        console.log('API Response:', response.data);
        setJoke(response.data.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();

    return () => {
      isMounted.current = false; 
    };
  }, []);

  const memoizedJoke = useMemo(() => joke, [joke]);

  return { loading, error, joke: memoizedJoke };
};

export default useJokeFetch;
