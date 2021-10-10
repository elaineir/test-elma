import './index.css';
import ProjectState from './state/ProjectState';
import {
  backlogCardSelectors,
  calendarColumnSelectors,
  fullDayInMilliseconds,
  popupSelectors,
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

const popupError = new PopupError(popupSelectors);
// контейнеры-рендереры
const backlogList = new RendererSection(backlogCardSelectors.parentSelector);
const usersList = new RendererSection(usersCardSelectors.parentSelector);
const calendarContainer = new Calendar(calendarColumnSelectors.parentSelector);
calendarContainer.setEventListeners();

const renderColumns = () => {
  for (let i = 0; i < ProjectState.calendarLength; i += 1) {
    const columnDate = ProjectState.startDay + fullDayInMilliseconds * i;
    const dateString = refineToNumericYYMMDD(columnDate);

    const calendarColumn = new CalendarColumn({ date: dateString }, calendarColumnSelectors);
    calendarContainer.addItem(calendarColumn.createCalendarColumn());
  }
};

const createBacklogCard = (task) => {
  const backlogCard = new BacklogCard(task, backlogCardSelectors);
  const newBacklogCard = backlogCard.createCard();
  backlogCard.setEventListeners();
  return newBacklogCard;
};

const renderBacklogTasks = () => {
  ProjectState.backlogTasks.forEach((task) => {
    const backlogCard = createBacklogCard(task);
    backlogList.addItem(backlogCard);
  });
};

const renderUsers = (users) =>
  users.forEach((user) => {
    const userCard = new UserCard(user, usersCardSelectors);
    const newUserCard = userCard.createCard();
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
    renderUsers(users);
    renderBacklogTasks();
    renderColumns();
  } catch (err) {
    popupError.open();
  }
};

getInitialData();

// поиск
initSearch(backlogList, createBacklogCard, renderBacklogTasks);
// перелистывание календаря
initSwitchBetweenWeeks(calendarContainer.clearItems, renderColumns);
// переключение темы
initToggleColorTheme(toggleThemeSettings);

// добавление наблюдателей в стейт для ререндера
ProjectState.addSubscriber(calendarContainer.clearItems);
ProjectState.addSubscriber(backlogList.clearItems);
ProjectState.addSubscriber(renderColumns);
ProjectState.addSubscriber(renderBacklogTasks);
