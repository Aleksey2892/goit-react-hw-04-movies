export default function updateMoviesImg(results) {
  const defUrl = 'https://image.tmdb.org/t/p/w200';

  const updateImgUrl = results.map(result => {
    if (result.poster_path) {
      result.poster_path = defUrl + result.poster_path;
    }
    return result;
  });
  return updateImgUrl;
}
