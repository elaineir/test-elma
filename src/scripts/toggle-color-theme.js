const initToggleColorTheme = ({
  bodySelector,
  bodyNewThemeClass,
  buttonSelector,
  buttonNewThemeClass,
}) => {
  const body = document.querySelector(bodySelector);
  const changeColorThemeButton = document.querySelector(buttonSelector);

  function toggleTheme() {
    body.classList.toggle(bodyNewThemeClass);
    changeColorThemeButton.classList.toggle(buttonNewThemeClass);
  }

  changeColorThemeButton.addEventListener('click', toggleTheme);
};

export default initToggleColorTheme;
