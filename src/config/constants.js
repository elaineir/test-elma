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

export const dateSettings = {
  locale: 'ru-RU',
  options: {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
};
