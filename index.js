// omdb api key -> e4293a14


const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img class="display-img" src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

        <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

const movieOnSelect = async (movieId) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "e4293a14",
      i: movieId,
    },
  });

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

autoComplete({
  root: document.querySelector(".autocomplete1"),
  async fetchData(movieSearch) {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "e4293a14",
      s: movieSearch,
    },
  });
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
},
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
      `;
  },
  onOptionSelect(movieId) {
    movieOnSelect(movieId)
  },
  inputValue(movieTitle) {
    return movieTitle;
  }
});

autoComplete({
  root: document.querySelector(".autocomplete2"),
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
      `;
  },
  onOptionSelect(movieId) {
    movieOnSelect(movieId);
  },
  inputValue(movieTitle) {
    return movieTitle;
  },
});
