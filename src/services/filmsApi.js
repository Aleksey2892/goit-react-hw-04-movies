import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = 'cc24e28d216ef164940b9fd9893ff62a';

const fetchTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`trending/movie/day?api_key=${apiKey}`);

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchPopularMovies = async () => {
  try {
    const { data } = await axios.get(
      `movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    );

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchWithQuery = async query => {
  try {
    const { data } = await axios.get(
      `search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`,
    );

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchMoviesById = async id => {
  try {
    const { data } = await axios.get(
      `movie/${id}?api_key=${apiKey}&language=en-US`,
    );

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchCastById = async id => {
  try {
    const { data } = await axios.get(`movie/${id}/credits?api_key=${apiKey}`);

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchReviewById = async id => {
  try {
    const { data } = await axios.get(
      `movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`,
    );

    if (data) return data;

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

export default {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchWithQuery,
  fetchMoviesById,
  fetchCastById,
  fetchReviewById,
};
