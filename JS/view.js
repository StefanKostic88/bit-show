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
      return `<li class="list-group-item" id="${movieData.id}">${movieData.name}</li>`;
    }
  }

  class MovieInfoView extends MovieCardView {
    constructor() {
      super();
    }
    render(movieInfo) {
      console.log(movieInfo);
      this.clearParentContainer();
      const {
        name,
        aka,
        img,
        seasons,
        cast,
        description,
        crewList,
        epizodesListArr,
      } = movieInfo;

      const akaHtml = aka
        .map((el) => {
          return `<li class="ms-2 me-2">${el.name} - ${el.country}</li>`;
        })
        .join("");
      const seasonHTML = seasons
        .map((el) => {
          return `<li>${el.start} - ${el.start}</li>`;
        })
        .join("");

      const castHtml = cast
        .map((el) => {
          return `<li>${el.actor} - ${el.character}</li>`;
        })
        .join("");

      const crewHTML = crewList
        .map((el) => {
          return `<li>${el.name} - ${el.type}</li>`;
        })
        .join("");

      const epizodHTML = epizodesListArr
        .map((el) => {
          return `<li>Season ${el.season}, epizode ${el.epizodeNum} - ${el.name}</li>`;
        })
        .join("");

      const html = `  <div class="movie-info m-0 p-0 d-flex flex-column align-items-center">
      <h2 class="text-center mb-4 mt-4 mt-md-2">
        ${name}
      </h2>
      <div class="row m-0 p-0 container-xl d-flex justify-content-center">
        <img
          class="img-fluid col col-sm-7 col-md-5 col-lg-4 p-0 h-50"
          src=${img}
          alt=""
        />
        <div class="col col-sm-5 col-md-5 col-lg-4 d-flex flex-column">
          <h3>Seasons(${seasons.length})</h3>
          <ul class="ps-md-5">
         ${seasonHTML}
     
          </ul>
          <h3>Cast</h3>
          <ul class="ps-md-5">
           ${castHtml}
          </ul>
        </div>
        <div class="pt-3 pb-3 mt-3 col-md-10 col-lg-8">
          <h4>Show Details</h4>
          ${description}
        </div>
        <div class="pt-3 pb-3 col-md-10 col-lg-8">
        <h3>AKA</h3>
        <ul class="d-flex flex-wrap align-items-center list-unstyled">
        ${akaHtml}
        </ul>
      </div>
        <div
          class="d-flex flex-column flex-md-row pt-3 pb-3 mt-3 col-md-10 col-lg-8"
        >
          <div class="me-md-5">
          <h3>Epizodes List</h3>
          <ul>
           ${epizodHTML}
          </ul>
           
          </div>
          <div class="ms-md-5">
          <h3>Crew</h3>
          <ul>
            ${crewHTML}
          </ul>
          </div>
        </div>
      </div>
    </div>`;
      this.parantEl[0].insertAdjacentHTML("beforeend", html);
    }

    generateMarkup(movie) {}
  }

  class PaginationView {
    constructor() {
      // document.querySelector(".pagination");
      this.parentEl = $(".pagination");
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
  <li class="page-item ${obj.curPage || obj.curPage === 0 ? "active" : ""}">
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

{
  /* <li>season - dsadasd</li>
<li>season - dsadasd</li>
<li>season - dsadasd</li>
<li>season - dsadasd</li>
<li>season - dsadasd</li>
<li>season - dsadasd</li>
<li>season - dsadasd</li> */
}
