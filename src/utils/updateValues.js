const defUrl = 'https://image.tmdb.org/t/p/w200';

export function updateCastImg(casts) {
  const updateImgUrl = casts.map(cast => {
    if (cast.profile_path) {
      cast.profile_path = defUrl + cast.profile_path;
    }

    return cast;
  });

  return updateImgUrl;
}

export function updateDetails(details) {
  if (details.poster_path) {
    details.poster_path = defUrl + details.poster_path;
  }

  if (details.release_date) {
    details.release_date = details.release_date.slice(0, 4);
  }

  return details;
}

export function updateMoviesImg(results) {
  if (results) {
    const updateImgUrl = results.map(result => {
      if (result.poster_path) {
        result.poster_path = defUrl + result.poster_path;
      }

      return result;
    });

    return updateImgUrl;
  }
}
