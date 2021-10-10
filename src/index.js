import './index.css';
import initToggleColorTheme from './utils/toggle-color-theme';
import getData from './api/main-api';
import {
  backlogCardSelectors,
  calendarColumnSelectors,
  fullDayInMilliseconds,
  popupSelectors,
  searchFormSelectors,
  timerDelay,
  toggleThemeSettings,
  usersCardSelectors,
  weekButtonsSelectors,
} from './config/constants';
import { TASKS_ROUTE, USERS_ROUTE } from './config/config';
import {
  BacklogCard,
  Calendar,
  CalendarColumn,
  PopupError,
  RendererSection,
  UserCard,
} from './components';
import ProjectState from './state/ProjectState';
import { refineToNumericYYMMDD } from './utils/handle-dates';

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
const searchForm = document.querySelector(searchFormSelectors.searchForm);
const searchInput = searchForm.querySelector(searchFormSelectors.searchInput);

const handleSearch = (evt) => {
  evt.preventDefault();
  const keyword = searchInput.value;
  const result = ProjectState.backlogTasks.filter((task) =>
    task.subject.toLowerCase().includes(keyword.toLowerCase())
  );
  backlogList.clearItems();

  if (result.length) {
    result.forEach((task) => {
      const backlogCard = createBacklogCard(task);
      backlogList.addItem(backlogCard);
    });
  } else {
    backlogList.addTextContent('Ничего не нашлось');
    setTimeout(() => {
      backlogList.clearItems();
      renderBacklogTasks();
    }, timerDelay);
  }
};

searchForm.addEventListener('submit', handleSearch);

// перелистывание календаря
const showNextWeek = () => {
  calendarContainer.clearItems();
  ProjectState.startDay += fullDayInMilliseconds * 7;
  renderColumns();
};

const showPrevWeek = () => {
  calendarContainer.clearItems();
  ProjectState.startDay -= fullDayInMilliseconds * 7;
  renderColumns();
};

const nextWeekButton = document.querySelector(weekButtonsSelectors.nextWeekButton);
const prevWeekButton = document.querySelector(weekButtonsSelectors.prevWeekButton);

nextWeekButton.addEventListener('click', showNextWeek);
prevWeekButton.addEventListener('click', showPrevWeek);

// инициализация переключателя темы
initToggleColorTheme(toggleThemeSettings);

// добавление наблюдателей в стейт для ререндера
ProjectState.addSubscriber(calendarContainer.clearItems);
ProjectState.addSubscriber(backlogList.clearItems);
ProjectState.addSubscriber(renderColumns);
ProjectState.addSubscriber(renderBacklogTasks);
