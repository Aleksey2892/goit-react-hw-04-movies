import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = 'cc24e28d216ef164940b9fd9893ff62a';

const defaultFetch = () => {
  return axios
    .get(`trending/movie/day?api_key=${apiKey}`)
    .then(({ data }) => data);
};

const fetchWithQuery = query => {
  return axios
    .get(
      `search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`,
    )
    .then(({ data }) => data);
};

const fetchWithId = id => {
  return axios
    .get(`movie/${id}?api_key=${apiKey}&language=en-US`)
    .then(({ data }) => data);
};

const fetchCastWithId = id => {
  return axios
    .get(`movie/${id}/credits?api_key=${apiKey}`)
    .then(({ data }) => data);
};

const fetchReviewWithId = id => {
  return axios
    .get(`movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then(({ data }) => data);
};

export default {
  defaultFetch,
  fetchWithQuery,
  fetchWithId,
  fetchCastWithId,
  fetchReviewWithId,
};
