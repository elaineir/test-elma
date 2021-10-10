import './index.css';
import initToggleColorTheme from './utils/toggle-color-theme';
import getData from './api/main-api';
import {
  backlogCardSelectors,
  calendarCellSelectors,
  calendarColumnSelectors,
  fullDayInMilliseconds,
  toggleThemeSettings,
  usersCardSelectors,
} from './config/constants';
import { TASKS_ROUTE, USERS_ROUTE } from './config/config';
import {
  BacklogCard,
  Calendar,
  CalendarCell,
  CalendarColumn,
  RendererSection,
  UserCard,
} from './components';
import ProjectState from './state/ProjectState';
import { refineToNumericYYMMDD } from './utils/handle-dates';

ProjectState.defineStartDay();

// контейнеры-рендереры
const backlogList = new RendererSection(backlogCardSelectors.parentSelector);
const usersList = new RendererSection(usersCardSelectors.parentSelector);
const calendarContainer = new Calendar(calendarColumnSelectors.parentSelector);
calendarContainer.setEventListeners();

const createCell = ({ date, tasksSchema, index }) => {
  const columnCell = new CalendarCell(
    { executor: index, date, tasks: tasksSchema[index] ?? [] },
    calendarCellSelectors
  );
  const cellElement = columnCell.createCell();
  columnCell.renderItems();
  return cellElement;
};

const renderColumns = () => {
  const rowCount = Object.keys(ProjectState.usersIds).length;
  for (let i = 0; i < ProjectState.calendarLength; i += 1) {
    const columnDate = ProjectState.startDay + fullDayInMilliseconds * i;
    const formattedDate = refineToNumericYYMMDD(columnDate);

    const calendarColumn = new CalendarColumn({ date: formattedDate }, calendarColumnSelectors);
    calendarContainer.addItem(calendarColumn.createCalendarColumn());

    // схема тасков для колонки по ключам исполнителей
    const tasksSchema = calendarColumn.getDayTasksSchema(ProjectState.assignedTasks);

    for (let y = 0; y < rowCount; y += 1) {
      const userId = ProjectState.usersIds[y];
      const cell = createCell({ date: formattedDate, tasksSchema, index: userId });
      calendarColumn.addItem(cell);
    }
  }
};

const renderBacklogTasks = () => {
  ProjectState.backlogTasks.forEach((task) => {
    const backlogCard = new BacklogCard(task, backlogCardSelectors);
    const newBacklogCard = backlogCard.createCard();
    backlogCard.setEventListeners();
    backlogList.addItem(newBacklogCard);
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
const getInitialData = () => {
  Promise.all([getData(USERS_ROUTE), getData(TASKS_ROUTE)])
    .then(([users, tasks]) => {
      // сортировка заданий и добавление их в стейт
      tasks.forEach((task) => {
        if (task.executor) ProjectState.addTaskToAssignedTasks(task);
        else ProjectState.addTaskToBacklog(task);
      });

      // отрисовка исполнителей
      renderUsers(users);
      ProjectState.mapUsersIds(users);

      // отрисовка бэклога
      renderBacklogTasks();

      // отрисока колонок календаря
      renderColumns();
    })
    .catch((err) => console.log(err));
};

getInitialData();

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

const nextWeekButton = document.querySelector('.button_next');
const prevWeekButton = document.querySelector('.button_prev');

nextWeekButton.addEventListener('click', showNextWeek);
prevWeekButton.addEventListener('click', showPrevWeek);

// инициализация переключателя темы
initToggleColorTheme(toggleThemeSettings);

// добавление наблюдателей в стейт для ререндера
ProjectState.addSubscriber(calendarContainer.clearItems);
ProjectState.addSubscriber(backlogList.clearItems);
ProjectState.addSubscriber(renderColumns);
ProjectState.addSubscriber(renderBacklogTasks);
