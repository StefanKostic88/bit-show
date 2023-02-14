const viewModule = (function () {
  class MovieCardView {
    constructor() {
      this.parantEl = $("#movie-container");
    }

    clearParentContainer() {
      this.parantEl[0].innerHTML = "";
    }
    render(arr) {
      this.clearParentContainer();
      const generatedCard = arr
        .map((card) => {
          return this.generateMarkup(card);
        })
        .join("");
      this.parantEl[0].insertAdjacentHTML("beforeend", generatedCard);
    }

    generateMarkup(card) {
      return `
      <div class="card m-xl-4 m-3" style="width: 18rem" id="${card.id}">
      <img
        src=${card.img}
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title text-center">${card.name}</h5>
      </div>
      </div> `;
    }
  }

  class SerachMovieListView {
    constructor() {
      this.parantEl = $(".search-movie__list");
    }
    clearParentContainer() {
      this.parantEl[0].innerHTML = "";
    }

    render(movieLIst) {
      this.clearParentContainer();
      const html = movieLIst.map((el) => this.generateMarkup(el)).join("");
      this.parantEl[0].insertAdjacentHTML("beforeend", html);
    }
    generateMarkup(movieData) {
      return `<li class="list-group-item search-movie__list-item" id="${movieData.id}">${movieData.name}</li>`;
    }
  }

  class MovieInfoView extends MovieCardView {
    constructor() {
      super();
    }
    render(movieInfo) {
      this.clearParentContainer();
      const { name, aka, img, seasons, cast, description, crew, episodes } =
        movieInfo;

      const html = `<div class="movie-info m-0 p-0 d-flex flex-column align-items-center position-relative">
      ${this.generateMovieTitle(name)} 
      <div class="row m-0 p-0 container-xl d-flex justify-content-center">
        ${this.generateImg(img)}
        <div class="col col-sm-5 col-md-5 col-lg-4 d-flex flex-column">
          ${this.generateSeasons(seasons)}
          ${this.generateCast(cast)}
        </div>
        ${this.generateDescription(description)}
        ${this.generateAka(aka)}
        <div
          class="d-flex flex-column flex-md-row pt-3 pb-3 mt-3 col-md-10 col-lg-8"
        >
        ${this.generateEpisodes(episodes)}
         ${this.generateCrew(crew)}
        </div>
      </div>
      <button type="button" class="btn btn-outline-dark position-absolute mt-3 mt-md-1 " id="close-movie__info">X</button>
    </div>`;
      this.parantEl[0].insertAdjacentHTML("beforeend", html);
    }

    generateMovieTitle(titleData) {
      return `<h2 class="text-center mb-4 mt-4 mt-md-2">
      ${titleData}
    </h2>`;
    }
    generateImg(imgData) {
      return `<img
      class="img-fluid col col-sm-7 col-md-5 col-lg-4 p-0 h-50"
      src=${imgData}
      alt=""
    />`;
    }
    generateAka(akaDate) {
      return `<div class="pt-3 pb-3 col-md-10 col-lg-8">
      <h3>AKA</h3>
      <ul class="d-flex flex-wrap align-items-center list-unstyled">
        ${akaDate
          .map((el) => {
            return `<li class="ms-2 me-2">${el.name} - ${el.country}</li>`;
          })
          .join("")}
        </ul>
        </div>`;
    }
    generateSeasons(seasonsData) {
      return `<h3>Seasons(${seasonsData.length})</h3>
        <ul class="ps-md-5">
       ${seasonsData
         .map((el) => {
           return `<li>${el.start} - ${el.start}</li>`;
         })
         .join("")}
        </ul>`;
    }
    generateCast(castData) {
      return `<h3>Cast</h3>
          <ul class="ps-md-5">
           ${castData
             .map((el) => {
               return `<li>${el.actor} - ${el.character}</li>`;
             })
             .join("")}
          </ul>`;
    }
    generateCrew(crewData) {
      return ` <div class="ms-md-5">
        <h3>Crew</h3>
        <ul>
          ${crewData
            .map((el) => {
              return `<li>${el.name} - ${el.type}</li>`;
            })
            .join("")}
        </ul>
        </div>`;
    }
    generateDescription(descriptionData) {
      return ` <div class="pt-3 pb-3 mt-3 col-md-10 col-lg-8">
      <h4>Show Details</h4>
      ${descriptionData}
    </div>`;
    }
    generateEpisodes(eoisodesData) {
      return ` <div class="me-md-5">
      <h3>Epizodes List</h3>
      <ul>
       ${eoisodesData
         .map((el) => {
           return `<li>S${this.doubleDigits(el.season)}.E${this.doubleDigits(
             el.epizodeNum
           )} - ${el.name}</li>`;
         })
         .join("")}
      </ul>
      </div>`;
    }
    doubleDigits(num) {
      return num.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    }
  }

  class PaginationView {
    constructor() {
      this.parentEl = $(".pagination");
    }
    hidePagination() {
      this.parentEl.addClass("d-none");
    }
    showPagination() {
      this.parentEl.removeClass("d-none");
    }
    clearParentElement() {
      this.parentEl[0].innerHTML = "";
    }
    render(obj) {
      this.clearParentElement();
      const html = `<li class="page-item ${
        obj.prevPage === 0 ? "disabled" : ""
      }">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.prevPage
  }"
    >Previous</a
  >
  </li>
  <li class="page-item ${obj.secondPrevPage <= 95 ? "d-none" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.secondPrevPage
  }"
    >${obj.secondPrevPage}</a
  >
  </li>
  <li class="page-item ${obj.prevPage <= 0 ? "d-none" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.prevPage
  }"
    >${obj.prevPage}</a
  >
  </li>
  <li class="page-item ${obj.curPage || obj.curPage === 0 ? "active" : ""} ">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.curPage
  }"
    >${obj.curPage === 0 ? "-" : obj.curPage}</a
  >
  </li>
  <li class="page-item ${obj.nextPage > 100 ? "d-none" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.nextPage
  }"
    >${obj.nextPage}</a
  >
  </li>
  <li class="page-item ${obj.secondNextPage >= 4 ? "d-none" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${
    obj.secondNextPage
  }"
    >${obj.secondNextPage}</a
  >
  </li>
  <li class="page-item  ${obj.nextPage >= 100 ? "disabled" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4" href="#" data-page="${
    obj.nextPage >= 100 ? 100 : obj.nextPage
  }"
    >Next</a
  >
  </li>
  <li class="page-item ${obj.curPage > 0 ? "active" : ""}">
  <a class="page-link ps-sm-3 pe-sm-3 ps-md-4 pe-md-4"  href="#" data-page="${0}"
    >${obj.curPage > 0 ? "Back To Top 50" : ""}</a
  >
  </li>`;

      this.parentEl[0].insertAdjacentHTML("beforeend", html);
    }
  }

  return {
    MovieCardView: new MovieCardView(),
    SerachMovieListView: new SerachMovieListView(),
    MovieInfoView: new MovieInfoView(),
    PaginationView: new PaginationView(),
  };
})();
