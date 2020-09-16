export default function updateCastImg(casts) {
  const defUrl = 'https://image.tmdb.org/t/p/w200';

  const updateImgUrl = casts.map(cast => {
    if (cast.profile_path) {
      cast.profile_path = defUrl + cast.profile_path;
    }
    return cast;
  });
  return updateImgUrl;
}
