import './index.css';
import initToggleColorTheme from './scripts/toggle-color-theme';
import getData from './api/main-api';
import {
  backlogCardSelectors,
  calendarColumnSelectors,
  fullDayInMilliseconds,
  toggleThemeSettings,
  usersCardSelectors,
} from './config/constants';
import { TASKS_ROUTE, USERS_ROUTE } from './config/config';
import createBacklogCard from './components/backlog-card';
import createUserCard from './components/user-card';
import createCalendarColumn from './components/calendar-column';
import { render } from './scripts/render-card';

// контейнеры карточек
const backlogList = document.querySelector(backlogCardSelectors.parentSelector);
const usersList = document.querySelector(usersCardSelectors.parentSelector);
const calendarContainer = document.querySelector(calendarColumnSelectors.parentSelector);
const calendarLength = 12;

const currentDate = new Date();
const monday = currentDate.setDate(currentDate.getDate() + 1 - currentDate.getDay());

const getInitialData = () => {
  Promise.all([getData(USERS_ROUTE), getData(TASKS_ROUTE)])
    .then(([users, tasks]) => {
      const mapUsersIds = (usersArray) =>
        usersArray.reduce(
          (obj, { id }) => ({
            ...obj,
            [id]: id,
          }),
          {}
        );

      const usersIds = mapUsersIds(users);
      const assignedTasks = [];

      users.forEach((task) => render({ element: createUserCard(task), parentElement: usersList }));

      tasks.forEach((task) => {
        if (task.executor) assignedTasks.push(task);
        else {
          render({ element: createBacklogCard(task), parentElement: backlogList });
        }
      });

      for (let i = 0; i < calendarLength; i += 1) {
        const updatedDate = monday + fullDayInMilliseconds * i;
        const taskForCurrentDay = assignedTasks.filter(
          (task) =>
            new Date(task.planStartDate).getTime() <= updatedDate &&
            updatedDate <= new Date(task.planEndDate).getTime() + fullDayInMilliseconds
        );

        const dayTasksSchema = {};
        if (taskForCurrentDay.length) {
          taskForCurrentDay.forEach((task) => {
            if (!dayTasksSchema[task.executor]) {
              dayTasksSchema[task.executor] = [task];
            } else dayTasksSchema[task.executor] = [...dayTasksSchema[task.executor], task];
          });
        }

        render({
          element: createCalendarColumn({
            rowsCount: users.length,
            usersIds,
            date: updatedDate,
            dayTasksSchema,
          }),
          parentElement: calendarContainer,
        });
      }

      console.log({ users });
      console.log({ assignedTasks });
    })
    .catch((err) => console.log(err));
};

getInitialData();
initToggleColorTheme(toggleThemeSettings);
