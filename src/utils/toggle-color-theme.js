import { localStorageThemeKey } from '../config/constants';

const initToggleColorTheme = ({ bodySelector, bodyNewThemeClass, buttonSelector }) => {
  const body = document.querySelector(bodySelector);
  const changeColorThemeButton = document.querySelector(buttonSelector);

  const isThemeDark = JSON.parse(localStorage.getItem(localStorageThemeKey));

  if (isThemeDark) {
    body.classList.add(bodyNewThemeClass);
  }

  const toggleAndMemoTheme = () => {
    if (body.classList.contains(bodyNewThemeClass)) {
      body.classList.remove(bodyNewThemeClass);
      localStorage.setItem(localStorageThemeKey, JSON.stringify(false));
    } else {
      body.classList.add(bodyNewThemeClass);
      localStorage.setItem(localStorageThemeKey, JSON.stringify(true));
    }
  };

  changeColorThemeButton.addEventListener('click', toggleAndMemoTheme);
};

export default initToggleColorTheme;
