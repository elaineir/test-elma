import './index.css';
import ProjectState from './state/ProjectState';
import {
  backlogCardSelectors,
  calendarColumnSelectors,
  fullDayInMilliseconds,
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
const calendarContainer = new Calendar(calendarColumnSelectors.parentSelector);
calendarContainer.setEventListeners();

const renderColumns = (isAnimated) => {
  for (let i = 0; i < ProjectState.calendarLength; i += 1) {
    const columnDate = ProjectState.startDay + fullDayInMilliseconds * i;
    const dateString = refineToNumericYYMMDD(columnDate);

    const calendarColumn = new CalendarColumn({ date: dateString }, calendarColumnSelectors);
    const columnElement = calendarColumn.createCalendarColumn();
    if (isAnimated) {
      applySlideInRightLeftAnim(columnElement, i);
    }
    calendarContainer.addItem(columnElement);
  }
};

const createBacklogCard = (task) => {
  const backlogCard = new BacklogCard(task, backlogCardSelectors);
  const newBacklogCard = backlogCard.createCard();
  backlogCard.setEventListeners();
  return newBacklogCard;
};

const renderBacklogTasks = () => {
  ProjectState.backlogTasks.forEach((task, i) => {
    const backlogCard = createBacklogCard(task);
    applySlideInBottomUpAnim(backlogCard, i);
    backlogList.addItem(backlogCard);
  });
};

const renderUsers = (users, isAnimated) =>
  users.forEach((user, i) => {
    const userCard = new UserCard(user, usersCardSelectors);
    const newUserCard = userCard.createCard();
    if (isAnimated) {
      applySlideInBottomUpAnim(newUserCard, i);
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
    renderColumns(true);
    renderBacklogTasks();
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
initSwitchBetweenWeeks(calendarContainer.clearItems, renderColumns);
// переключение темы
initToggleColorTheme(toggleThemeSettings);

// добавление наблюдателей в стейт для ререндера
ProjectState.addSubscribers([
  calendarContainer.clearItems,
  backlogList.clearItems,
  renderColumns,
  renderBacklogTasks,
]);
