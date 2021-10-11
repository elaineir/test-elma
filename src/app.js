import './index.css';
import ProjectState from './state/ProjectState';
import {
  backlogCardSelectors,
  calendarColumnSelectors,
  calendarDateSelectors,
  fullDayInMilliseconds,
  maxIndexForAnimation,
  popupSelectors,
  preloaderStateSelectors,
  toggleThemeSettings,
  usersCardSelectors,
} from './config/constants';
import { TASKS_ROUTE, USERS_ROUTE } from './config/config';
import { refineToNumericYYMMDD } from './utils/handle-dates';
import { initSwitchBetweenWeeks, initToggleColorTheme } from './utils';
import getData from './api/main-api';
import {
  BacklogCard,
  Calendar,
  CalendarColumn,
  CalendarDate,
  PopupError,
  RendererSection,
  UserCard,
} from './components';
import initSearch from './utils/search';
import { applySlideInBottomUpAnim, applySlideInRightLeftAnim } from './utils/apply-style-animation';

const page = document.querySelector(preloaderStateSelectors.pageSelector);
const preloader = document.querySelector(preloaderStateSelectors.preloaderSelector);
const popupError = new PopupError(popupSelectors);
// контейнеры-рендереры
const backlogList = new RendererSection(backlogCardSelectors.parentSelector);
const usersList = new RendererSection(usersCardSelectors.parentSelector);
const datesContainer = new RendererSection(calendarDateSelectors.parentSelector);
const calendarContainer = new Calendar(calendarColumnSelectors.parentSelector);
calendarContainer.setEventListeners();

const renderCalendarItems = (ItemConstructor, parentContainer, selectors, isAnimated) => {
  for (let i = 0; i < ProjectState.calendarLength; i += 1) {
    const thisDate = ProjectState.startDay + fullDayInMilliseconds * i;
    const dateString = refineToNumericYYMMDD(thisDate);

    const thisItem = new ItemConstructor({ date: dateString }, selectors);
    const dateElement = thisItem.createElement();
    if (isAnimated) {
      applySlideInRightLeftAnim(dateElement, i, ProjectState.calendarLength - 1);
    }
    parentContainer.addItem(dateElement);
  }
};

const renderDates = (isAnimated) =>
  renderCalendarItems(CalendarDate, datesContainer, calendarDateSelectors, isAnimated);
const renderColumns = (isAnimated) =>
  renderCalendarItems(CalendarColumn, calendarContainer, calendarColumnSelectors, isAnimated);

const createBacklogCard = (task) => {
  const backlogCard = new BacklogCard(task, backlogCardSelectors);
  const newBacklogCard = backlogCard.createElement();
  backlogCard.setEventListeners();
  return newBacklogCard;
};

const renderBacklogTasks = (isAnimated) => {
  ProjectState.backlogTasks.forEach((task, i) => {
    const backlogCard = createBacklogCard(task);
    if (isAnimated) {
      applySlideInBottomUpAnim(backlogCard, i, maxIndexForAnimation.backlogCards);
    }
    backlogList.addItem(backlogCard);
  });
};

const renderUsers = (users, isAnimated) =>
  users.forEach((user, i) => {
    const userCard = new UserCard(user, usersCardSelectors);
    const newUserCard = userCard.createCard();
    if (isAnimated) {
      applySlideInBottomUpAnim(newUserCard, i, maxIndexForAnimation.users);
    }
    userCard.setEventListeners();
    usersList.addItem(newUserCard);
  });

// первая отрисовка и обработка данных с сервера
const getInitialData = async () => {
  try {
    const users = await getData(USERS_ROUTE);
    const tasks = await getData(TASKS_ROUTE);

    // сортировка заданий и добавление их в стейт
    tasks.forEach((task) => {
      if (task.executor) ProjectState.addTaskToAssignedTasks(task);
      else ProjectState.addTaskToBacklog(task);
    });
    // формирование объекта с id исполнителей
    ProjectState.users = users;
    ProjectState.mapUsersIds(users);
    // рендеринг
    renderUsers(users, true);
    renderDates(true);
    renderColumns(true);
    renderBacklogTasks(true);
  } catch (err) {
    popupError.open();
  }
  page.classList.remove(preloaderStateSelectors.pageHiddenClass);
  preloader.classList.remove(preloaderStateSelectors.preloaderVisibleClass);
};

getInitialData();

// поиск
initSearch(backlogList, createBacklogCard, renderBacklogTasks);
// перелистывание календаря
initSwitchBetweenWeeks(
  calendarContainer.clearItems,
  datesContainer.clearItems,
  renderDates,
  renderColumns
);
// переключение темы
initToggleColorTheme(toggleThemeSettings);

// добавление наблюдателей в стейт для ререндера
ProjectState.addSubscribers([
  calendarContainer.clearItems,
  backlogList.clearItems,
  renderColumns,
  renderBacklogTasks,
]);
