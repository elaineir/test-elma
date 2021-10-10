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
import { BacklogCard, CalendarColumn, ColumnCell, RendererSection, UserCard } from './components';

const assignedTasks = [];
let usersMap = {};
const calendarLength = 7;

// опреление первой даты календаря
const currentDate = new Date();
let monday = currentDate.setDate(currentDate.getDate() + 1 - currentDate.getDay());

// контейнеры-рендереры
const backlogList = new RendererSection(backlogCardSelectors.parentSelector);
const calendarContainer = new RendererSection(calendarColumnSelectors.parentSelector);
const usersList = new RendererSection(usersCardSelectors.parentSelector);

const createCell = ({ date, tasksSchema, index }) => {
  const columnCell = new ColumnCell(
    { executor: usersMap[index], date, tasks: tasksSchema[index] ?? [] },
    calendarCellSelectors
  );
  return columnCell.createCell();
};

const renderColumns = () => {
  const rowCount = Object.keys(usersMap).length;
  for (let i = 0; i < calendarLength; i += 1) {
    const columnDate = monday + fullDayInMilliseconds * i;
    const formattedDate = new Date(columnDate).toLocaleDateString('en-CA');

    const calendarColumn = new CalendarColumn({ date: formattedDate }, calendarColumnSelectors);
    calendarContainer.addItem(calendarColumn.createCalendarColumn());

    // схема тасков для колонки по ключам исполнителей
    const tasksSchema = calendarColumn.getDayTasksSchema(assignedTasks);

    for (let y = 0; y < rowCount; y += 1) {
      const userId = usersMap[y];
      const cell = createCell({ date: formattedDate, tasksSchema, index: userId });
      calendarColumn.addItem(cell);
    }
  }
};

// перелистывание календаря
const showNextWeek = () => {
  calendarContainer.clearItems();
  monday += fullDayInMilliseconds * 7;
  renderColumns();
};

const showPrevWeek = () => {
  calendarContainer.clearItems();
  monday -= fullDayInMilliseconds * 7;
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
        if (task.executor) assignedTasks.push(task);
        else {
          const backlogCard = new BacklogCard(task, backlogCardSelectors);
          backlogList.addItem(backlogCard.createCard());
        }
      });
      // отрисовка users в таблицу
      users.forEach((user) => {
        const userCard = new UserCard(user, usersCardSelectors);
        usersList.addItem(userCard.createCard());
      });

      const userIds = users.reduce((obj, { id }, i) => ({ ...obj, [i]: id }), {});
      usersMap = { ...userIds };
      renderColumns();
    })
    .catch((err) => console.log(err));
};

getInitialData();
initToggleColorTheme(toggleThemeSettings);
