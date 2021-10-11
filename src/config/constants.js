export const toggleThemeSettings = {
  bodySelector: '.body',
  bodyNewThemeClass: 'body_theme_dark',
  buttonSelector: '.button_theme',
  buttonNewThemeClass: 'button_theme_dark',
};

export const backlogCardSelectors = {
  parentSelector: '.backlog__tasks-container',
  templateSelector: '.template-card-backlog',
  elementSelector: '.card-backlog',
  titleSelector: '.card-backlog__title',
  descriptionSelector: '.card-backlog__description',
  startDateSelector: '.card-backlog__date-span_start',
  endDateSelector: '.card-backlog__date-span_end',
};

export const usersCardSelectors = {
  parentSelector: '.board__users',
  templateSelector: '.template-card-user',
  elementSelector: '.card-user',
  userNameSelector: '.card-user__name',
  dragOverClass: 'card-user_drag-over',
};

export const calendarColumnSelectors = {
  parentSelector: '.board__calendar',
  templateSelector: '.template-calendar-column',
  elementSelector: '.calendar-column',
  dateCellSelector: '.calendar-column__date',
  currentDayClass: 'calendar-column_current-day',
};

export const calendarCellSelectors = {
  templateSelector: '.template-calendar-cell',
  elementSelector: '.calendar-cell',
  elementClass: 'calendar-cell',
  dragOverClass: 'calendar-cell_drag-over',
};

export const calendarTaskSelectors = {
  templateSelector: '.template-calendar-task',
  elementSelector: '.calendar-task',
  elementClass: 'calendar-task',
  titleSelector: '.calendar-task__title',
  subtitleSelector: '.calendar-task__subtitle',
  descriptionSelector: '.calendar-task__description',
  startDateSelector: '.calendar-task__date-span_start',
  endDateSelector: '.calendar-task__date-span_end',
};

export const weekButtonsSelectors = {
  nextWeekButton: '.button_next',
  prevWeekButton: '.button_prev',
};

export const popupSelectors = {
  popupError: '.popup_error',
  popupOpenClass: 'popup_open',
};

export const searchFormSelectors = {
  searchForm: '.search-form',
  searchInput: '.search-form__input',
  submitButton: '.button_search',
};

export const preloaderStateSelectors = {
  pageSelector: '.page',
  pageHiddenClass: 'page_hidden',
  preloaderSelector: '.preloader',
  preloaderVisibleClass: 'preloader_visible',
};

export const dateSettings = {
  locale: 'ru-RU',
  options: {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  numeric: {
    day: 'numeric',
    month: 'numeric',
  },
};

export const fullDayInMilliseconds = 3600 * 24 * 1000;
export const timerDelay = 3000;
export const localStorageThemeKey = 'isThemeDark';
