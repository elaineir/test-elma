import './index.css';
import initToggleColorTheme from './scripts/toggle-color-theme';
import getData from './api/main-api';
import { backlogCardSelectors, toggleThemeSettings } from './config/constants';
import { TASKS_ROUTE, USERS_ROUTE } from './config/config';
import createBacklogCard from './scripts/backlog-card';
import { render } from './scripts/render-card';

// контейнеры карточек
const backlogList = document.querySelector(backlogCardSelectors.parentSelector);

const getInitialData = () => {
  Promise.all([getData(USERS_ROUTE), getData(TASKS_ROUTE)])
    .then(([users, tasks]) => {
      const assignedTasks = [];

      tasks.forEach((task) => {
        if (task.executor) assignedTasks.push(task);
        else {
          render({ element: createBacklogCard(task), parentElement: backlogList });
        }
      });

      console.log({ users });
      console.log({ assignedTasks });
    })
    .catch((err) => console.log(err));
};

getInitialData();
initToggleColorTheme(toggleThemeSettings);
