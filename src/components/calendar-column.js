import { calendarColumnSelectors, dateSettings } from '../config/constants';
import { getTemplate, render } from '../scripts/render-card';
import createCalendarCell from './calendar-cell';

const { templateSelector, elementSelector, dateCellSelector } = calendarColumnSelectors;

const createCalendarColumn = ({ rowsCount, usersIds, date, dayTasksSchema }) => {
  const calendarColumn = getTemplate({
    templateSelector,
    elementSelector,
  });

  const dateElement = calendarColumn.querySelector(dateCellSelector);
  dateElement.textContent = new Date(date).toLocaleDateString(
    dateSettings.locale,
    dateSettings.numeric
  );

  const renderCells = () => {
    for (let i = 0; i < rowsCount; i += 1) {
      render({
        element: createCalendarCell({ executor: usersIds[i], date, tasks: dayTasksSchema[i] }),
        parentElement: calendarColumn,
      });
    }
  };

  renderCells();

  return calendarColumn;
};

export default createCalendarColumn;
