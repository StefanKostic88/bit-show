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
  const initFirstPage = async function () {
    try {
      const x = getInitialData();
      console.log(x);
      const firstPage = [...(await getInitialData())];
      MovieCardView.render(firstPage);
      PaginationView.render(state.currentPage);
      $(".card").on("click", async function () {
        // showMovienfo(+this.id);
        console.log(+this.id);
        state.movieInfo = await showMovienfo(+this.id);
        MovieInfoView.render(state.movieInfo);
        console.log(state.movieInfo);
        //name
        //summary
      });
    } catch (err) {
      console.log(err);
    }
  };
  initFirstPage();
  $(".form-control").on("keyup", async function () {
    const movieListArr = [...(await getSearchMovieLIstData(this.value))];
    SerachMovieListView.render(movieListArr);
  });
  $(".pagination").on("click", async function (e) {
    if (!isFinite(+e.target.dataset.page)) return;
    if (+e.target.dataset.page === state.currentPage.curPage) return;
    state.currentPage = { ...changePage(+e.target.dataset.page) };
    console.log(state.currentPage.curPage);
    let curPage = [...(await getInitialData(state.currentPage.curPage))];
    MovieCardView.render(curPage);
    PaginationView.render(state.currentPage);
    $(".card").on("click", async function () {
      // showMovienfo(+this.id);
      console.log(+this.id);
      state.movieInfo = await showMovienfo(+this.id);
      MovieInfoView.render(state.movieInfo);
      console.log(state.movieInfo);
      //name
      //summary
    });
  });
  $(".card").on("click", function (e) {
    console.log(this);
  });
  const getI = async function () {
    state.movieInfo = await showMovienfo(167);
    console.log(state.movieInfo);
    MovieInfoView.render(state.movieInfo);
  };
  // getI();
})(modelModule, viewModule);
