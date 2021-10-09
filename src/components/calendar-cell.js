import { calendarCellSelectors } from '../config/constants';
import { getTemplate } from '../scripts/render-card';

const { templateSelector, elementSelector, titleSelector } = calendarCellSelectors;

const createCalendarCell = ({ subject = '', executor, date, tasks = [] }) => {
  const cellElement = getTemplate({
    templateSelector,
    elementSelector,
  });

  const titleElement = cellElement.querySelector(titleSelector);
  titleElement.textContent = tasks.length;

  cellElement.setAttribute('data-executor', executor);
  cellElement.setAttribute('data-date', date);

  return cellElement;
};

export default createCalendarCell;
