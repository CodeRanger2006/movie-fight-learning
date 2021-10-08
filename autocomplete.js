const autoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
        <div class="dropdown-content results">

        </div>
        </div>
    </div>
`;
  const searchInput = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onSearchInput = async (event) => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    items.forEach((item) => {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      resultsWrapper.appendChild(option);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        searchInput.value = inputValue(item.Title);
        let itemId = item.imdbID;
        onOptionSelect(itemId);
      });
    });
  };

  const debouncer = debounce(onSearchInput, 600);

  searchInput.addEventListener("input", debouncer);
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
