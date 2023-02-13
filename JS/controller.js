(function (model, view) {
  const { MovieCardView, SerachMovieListView, MovieInfoView, PaginationView } =
    view;
  const {
    state,
    getInitialData,
    getSearchMovieLIstData,
    changePage,
    showMovienfo,
  } = model;

  const controlCloseMovieInfo = async function (e) {
    if (!e.target.closest("#movie-container")) {
      let curPage = [...(await getInitialData(state.currentPage.curPage))];
      PaginationView.showPagination();
      MovieCardView.render(curPage);
      PaginationView.render(state.currentPage);
    } else {
      if (!e.target.closest(".card")) return;
      state.movieInfo = await showMovienfo(+e.target.closest(".card").id);
      MovieInfoView.render(state.movieInfo);
      PaginationView.hidePagination();
    }
  };

  const controlMovieInfo = async function () {
    state.movieInfo = await showMovienfo(+this.id);
    MovieInfoView.render(state.movieInfo);
    PaginationView.hidePagination();
    console.log("click");
    $("body").on("click", controlCloseMovieInfo);
  };

  const initLandingPage = async function () {
    try {
      const firstPage = [...(await getInitialData())];
      MovieCardView.render(firstPage);
      PaginationView.render(state.currentPage);
      $(".card").on("click", controlMovieInfo);
    } catch (err) {
      console.log(err);
    }
  };
  initLandingPage();
  $(".form-control").on("keyup", async function () {
    const movieListArr = [...(await getSearchMovieLIstData(this.value))];
    SerachMovieListView.render(movieListArr);
  });

  $(".pagination").on("click", async function (e) {
    if (!isFinite(+e.target.dataset.page)) return;
    if (+e.target.dataset.page === state.currentPage.curPage) return;
    state.currentPage = { ...changePage(+e.target.dataset.page) };
    let curPage = [...(await getInitialData(state.currentPage.curPage))];
    MovieCardView.render(curPage);
    PaginationView.render(state.currentPage);
    $(".card").on("click", controlMovieInfo);
  });
})(modelModule, viewModule);
