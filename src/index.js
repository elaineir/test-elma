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
import { BacklogCard, CalendarCell, CalendarColumn, RendererSection, UserCard } from './components';
import BoardState from './state/BoardState';

// инициализация стейта проекта
const ProjectState = BoardState.getInstance();
ProjectState.defineStartDay();

// контейнеры-рендереры
const backlogList = new RendererSection(backlogCardSelectors.parentSelector);
const calendarContainer = new RendererSection(calendarColumnSelectors.parentSelector);
const usersList = new RendererSection(usersCardSelectors.parentSelector);

const createCell = ({ date, tasksSchema, index }) => {
  const columnCell = new CalendarCell(
    { executor: ProjectState.usersIds[index], date, tasks: tasksSchema[index] ?? [] },
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
    const formattedDate = new Date(columnDate).toLocaleDateString('en-CA');

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

// первая отрисовка и обработка данных с сервера
const getInitialData = () => {
  Promise.all([getData(USERS_ROUTE), getData(TASKS_ROUTE)])
    .then(([users, tasks]) => {
      // отрисовка tasks в backlog
      tasks.forEach((task) => {
        if (task.executor) {
          ProjectState.assignTask(task);
        } else {
          const backlogCard = new BacklogCard(task, backlogCardSelectors);
          backlogList.addItem(backlogCard.createCard());
        }
      });
      console.log(ProjectState.assignedTasks);

      // отрисовка users в таблицу
      users.forEach((user) => {
        const userCard = new UserCard(user, usersCardSelectors);
        usersList.addItem(userCard.createCard());
      });
      ProjectState.mapUsersIds(users);
      renderColumns();
    })
    .catch((err) => console.log(err));
};

getInitialData();
initToggleColorTheme(toggleThemeSettings);
