const modelModule = (function () {
  const state = {
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
      this.description = description; //data.summary,
      this.seasons = seasons;
      this.cast = cast;
      this.crew = crew;
      this.aka = aka; //aka || "Unavailable",
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

  const getInitialData = async function (curPage = 0) {
    try {
      const res = await fetch(`http://api.tvmaze.com/shows?page=${curPage}`);
      const data = await res.json();
      if (!res.ok) throw new Error();
      console.log(data);
      if (curPage === 0) {
        console.log(data);
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

  const showMovienfo = async function (id) {
    // https://api.tvmaze.com/seasons/1/episodes
    // https://api.tvmaze.com/shows/1/cast
    const urlAdress = `https://api.tvmaze.com/shows/${id}`;

    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const seasonsRes = await fetch(
      `https://api.tvmaze.com/shows/${id}/seasons`
    );
    const castRes = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    const akaRes = await fetch(`https://api.tvmaze.com/shows/${id}/akas`);
    const crewRes = await fetch(`https://api.tvmaze.com/shows/${id}/crew`);
    const epizodezListRes = await fetch(
      `https://api.tvmaze.com/shows/${id}/episodes`
    );
    const data = await res.json();
    const seasonsData = await seasonsRes.json();
    const castData = await castRes.json();
    const akaData = await akaRes.json();
    const crewData = await crewRes.json();
    const epizodesListData = await epizodezListRes.json();

    const seasArrOb = seasonsData.map((el) => {
      return { start: el.premiereDate, end: el.endDate };
    });
    // console.log();
    // const seasons = {
    //   seasons: seasonsData.length,
    //   seasonsList: [...seasArrOb],
    // };
    const castObj = castData.map((el) => {
      return {
        actor: el.person.name,
        character: el.character.name,
      };
    });
    console.log(akaData);
    const akaList = akaData.map((el) => {
      return {
        name: el.name,
        country: el.country ? el.country.name : "Unavailable",
      };
    });
    console.log(akaList);

    const crewD = crewData
      ? crewData.map((el) => {
          return {
            type: el.type,
            name: el.person.name,
          };
        })
      : "No crew";
    // // console.log(crewD);
    const epizodesList = epizodesListData.map((el) => {
      return {
        season: el.season,
        epizodeNum: el.number,
        name: el.name,
      };
    });
    // // console.log(epizodesList);

    return {
      name: data.name,
      img: data.image
        ? data.image.original
        : "https://static.tvmaze.com/uploads/images/medium_portrait/7/18392.jpg",
      description: data.summary,
      seasons: [...seasArrOb],
      cast: [...castObj],
      crewList: [...crewD],
      aka: [...akaList],
      epizodesListArr: [...epizodesList],
    };
  };

  const getSearchMovieLIstData = async function (searchTerm = "") {
    console.log(searchTerm);
    const res = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    const data = await res.json();
    return data.map((el) => generateMovieListItem(el.show));
  };

  const changePage = function (cruPage) {
    return {
      secondPrevPage: cruPage - 2,
      prevPage: cruPage - 1,
      curPage: cruPage,
      nextPage: cruPage + 1,
      secondNextPage: cruPage + 2,
    };
  };

  return {
    state,
    getInitialData,
    showMovienfo,
    getSearchMovieLIstData,
    changePage,
  };
})();
