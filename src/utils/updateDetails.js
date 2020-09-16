export default function updateDetails(details) {
  if (details.poster_path) {
    const defUrl = 'https://image.tmdb.org/t/p/w200';
    details.poster_path = defUrl + details.poster_path;
  }

  if (details.release_date) {
    details.release_date = details.release_date.slice(0, 4);
  }

  return details;
}
