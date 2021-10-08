const debounce = (onInput, delay) => {
  let timeoutId;
  return (args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => onInput(args), delay);
  };
};
