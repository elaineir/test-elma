export const toggleThemeSettings = {
  bodySelector: '.body',
  bodyNewThemeClass: 'body_theme_dark',
  buttonSelector: '.button_theme',
  buttonNewThemeClass: 'button_theme_dark',
};

export const backlogCardSelectors = {
  templateSelector: '.template-card-backlog',
  elementSelector: '.card-backlog',
  titleSelector: '.card-backlog__title',
  descriptionSelector: '.card-backlog__description',
  startDateSelector: '.card-backlog__date-span_start',
  endDateSelector: '.card-backlog__date-span_end',
  parentSelector: '.backlog__tasks-container',
};

export const usersCardSelectors = {
  templateSelector: '.template-card-user',
  elementSelector: '.card-user',
  userNameSelector: '.card-user__name',
  parentSelector: '.board__users',
};

export const calendarColumnSelectors = {
  templateSelector: '.template-calendar-column',
  elementSelector: '.calendar-column',
  dateCellSelector: '.calendar-column__date',
  parentSelector: '.board__calendar',
};

export const calendarCellSelectors = {
  templateSelector: '.template-calendar-cell',
  elementSelector: '.calendar-cell',
};

export const calendarTaskSelectors = {
  templateSelector: '.template-calendar-task',
  elementSelector: '.calendar-task',
  titleSelector: '.calendar-task__title',
  subtitleSelector: '.calendar-task__subtitle',
  descriptionSelector: '.calendar-task__description',
  startDateSelector: '.calendar-task__date-span_start',
  endDateSelector: '.calendar-task__date-span_end',
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
