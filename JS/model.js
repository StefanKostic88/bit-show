export const state = {
  currentPage: {
    secondPrevPage: -2,
    prevPage: -1,
    curPage: 0,
    nextPage: 1,
    secondNextPage: 2,
  },
  movieInfo: {},
};

class Movie {
  constructor(name, img, id) {
    this.name = name;
    this.img = img;
    this.id = id;
  }
}
class MovieListItem {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

class MovieInfo {
  constructor(name, img, description, seasons, cast, crew, aka, episodes) {
    this.name = name;
    this.img = img;
    this.description = description;
    this.seasons = seasons;
    this.cast = cast;
    this.crew = crew;
    this.aka = aka;
    this.episodes = episodes;
  }
}

const generateMovieInfo = (
  name,
  img,
  description,
  seasons,
  cast,
  crew,
  aka,
  episodes
) => {
  const newImg = img
    ? img.original
    : "https://static.tvmaze.com/uploads/images/medium_portrait/7/18392.jpg";
  const newAka = aka || "Unavailable";
  return new MovieInfo(
    name,
    newImg,
    description,
    seasons,
    cast,
    crew,
    newAka,
    episodes
  );
};

const generateMovies = (obj) => {
  return new Movie(
    obj.name,
    obj.image
      ? obj.image.medium
      : "https://static.tvmaze.com/uploads/images/medium_portrait/7/18392.jpg",
    obj.id
  );
};
const generateMovieListItem = (obj) => {
  return new MovieListItem(obj.name, obj.id);
};

//////Get top 50 tv shows

export const getInitialData = async function (curPage = 0) {
  try {
    const res = await fetch(`http://api.tvmaze.com/shows?page=${curPage}`);
    const data = await res.json();
    if (!res.ok) throw new Error();

    if (curPage === 0) {
      return data
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, 50)
        .map((movie) => generateMovies(movie));
    } else {
      return data
        .sort((a, b) => b.rating.average - a.rating.average)
        .map((movie) => generateMovies(movie));
    }
  } catch (err) {
    console.log(err.message);
  }
};
//Movie Info
export const showMovienfo = async function (id) {
  const res = await fetch(
    `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast&embed[]=crew&embed[]=akas&embed[]=episodes`
  );

  const data = await res.json();

  const mapedSeasonsArr = data._embedded.seasons.map((el) => {
    return { start: el.premiereDate, end: el.endDate };
  });

  const mapedCastArr = data._embedded.cast.map((el) => {
    return {
      actor: el.person.name,
      character: el.character.name,
    };
  });

  const akaList = data._embedded.akas.map((el) => {
    return {
      name: el.name,
      country: el.country ? el.country.name : "Unavailable",
    };
  });

  const mapedCrewArr = data._embedded.crew
    ? data._embedded.crew.map((el) => {
        return {
          type: el.type,
          name: el.person.name,
        };
      })
    : "No crew";

  const mapedEpizodesListArr = data._embedded.episodes.map(
    ({ season, number, name }) => {
      return {
        season: season,
        epizodeNum: number,
        name,
      };
    }
  );

  return generateMovieInfo(
    data.name,
    data.image,
    data.summary,
    [...mapedSeasonsArr],
    [...mapedCastArr],
    [...mapedCrewArr],
    [...akaList],
    [...mapedEpizodesListArr]
  );
};

export const getSearchMovieLIstData = async function (searchTerm = "") {
  const res = await fetch(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  const data = await res.json();
  return data.map((el) => generateMovieListItem(el.show));
};

export const changePage = function (cruPage) {
  return {
    secondPrevPage: cruPage - 2,
    prevPage: cruPage - 1,
    curPage: cruPage,
    nextPage: cruPage + 1,
    secondNextPage: cruPage + 2,
  };
};
