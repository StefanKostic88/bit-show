import {
  movieCardView as MovieCardView,
  serachMovieListView as SerachMovieListView,
  movieInfoView as MovieInfoView,
  paginationView as PaginationView,
} from "./view.js";

import {
  state,
  getInitialData,
  showMovienfo,
  getSearchMovieLIstData,
  changePage,
} from "../js/model.js";

const appInit = () => {
  //Render Landing Page

  initLandingPage();

  // Event Listeners

  $(".form-control").on("keyup", controlInputChange);
  $(".pagination").on("click", controlPagination);
  $(".logo").on("click", controlLogoClick);
  $(".form-control").on("mouseup", controlClearMovieList);
  $(".dark-mode__toggler input").on("change", function () {
    $("body").toggleClass("light-theme");
    $("body").toggleClass("dark-theme");
  });
};

const initLandingPage = async function () {
  try {
    const firstPage = [...(await getInitialData())];
    MovieCardView.render(firstPage);
    PaginationView.render(state.currentPage);
    $(".card").fadeOut(0).delay(100).fadeIn(500).on("click", controlMovieInfo);
  } catch (err) {
    console.log(err);
  }
};

////controlerHandlers

const controlLogoClick = async function () {
  const firstPage = [...(await getInitialData())];
  MovieCardView.render(firstPage);
  state.currentPage = changePage(0);
  PaginationView.render(state.currentPage);
  PaginationView.showPagination();
  $(".card").fadeOut(0).delay(100).fadeIn(500).on("click", controlMovieInfo);
};

const controlPagination = async function (e) {
  if (typeof e === "object") {
    if (!isFinite(+e.target.dataset.page)) return;
    if (+e.target.dataset.page === state.currentPage.curPage) return;
    state.currentPage = { ...changePage(+e.target.dataset.page) };
  } else {
    state.currentPage = { ...changePage(e) };
  }
  let curPage = [...(await getInitialData(state.currentPage.curPage))];
  MovieCardView.render(curPage);
  PaginationView.render(state.currentPage);
  $(".card").fadeOut(0).delay(100).fadeIn(500).on("click", controlMovieInfo);
};

const controlCloseMovieInfo = async function () {
  controlPagination(state.currentPage.curPage);
  PaginationView.showPagination();
  PaginationView.render(state.currentPage);
  $(".card").fadeOut(0).delay(100).fadeIn(500);
};

const controlMovieInfo = async function () {
  state.movieInfo = await showMovienfo(+this.id);
  MovieInfoView.render(state.movieInfo);
  $(".movie-info").fadeOut(0).fadeIn(700);
  PaginationView.hidePagination();
  SerachMovieListView.clearParentContainer();
  $(".form-control").val("");
  $("#close-movie__info").on("click", controlCloseMovieInfo);
};

const controlInputChange = async function () {
  const movieListArr = [...(await getSearchMovieLIstData(this.value))];
  SerachMovieListView.render(movieListArr);
  $(".search-movie__list-item").on("click", controlMovieInfo);
};

const controlClearMovieList = function () {
  setTimeout(() => {
    if ($(this).val() === "") {
      SerachMovieListView.clearParentContainer();
    }
  }, 200);
};

/// Initalization

appInit();

// console.log("");
