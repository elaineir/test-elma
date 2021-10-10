import Component from './Component';
import { refineToNumericDDMM } from '../utils/handle-dates';
import ProjectState from '../state/ProjectState';

class CalendarColumn extends Component {
  constructor(column, { templateSelector, elementSelector, dateCellSelector, currentDayClass }) {
    super({ templateSelector, elementSelector });
    this._column = column;
    this._calendarColumn = super._getTemplate();
    this._dateElement = this._calendarColumn.querySelector(dateCellSelector);
    this._currentDayClass = currentDayClass;
  }

  createCalendarColumn() {
    const columnDate = new Date(this._column.date);
    this._dateElement.textContent = refineToNumericDDMM(columnDate);
    if (this._column.date === ProjectState.currentDateNumeric) {
      this._calendarColumn.classList.add(this._currentDayClass);
    }
    return this._calendarColumn;
  }

  _getTasksForCurrentDay(tasks) {
    const parsedColumnDate = Date.parse(this._column.date);
    return tasks.filter(
      (task) =>
        Date.parse(task.planStartDate) <= parsedColumnDate &&
        parsedColumnDate <= Date.parse(task.planEndDate)
    );
  }

  getDayTasksSchema(tasks) {
    this._tasksForCurrentDay = this._getTasksForCurrentDay(tasks);

    this._dayTasksSchema = {};
    if (this._tasksForCurrentDay) {
      this._tasksForCurrentDay.forEach((task) => {
        if (!this._dayTasksSchema[task.executor]) {
          this._dayTasksSchema[task.executor] = [task];
        } else {
          this._dayTasksSchema[task.executor] = [...this._dayTasksSchema[task.executor], task];
        }
      });
    }
    return this._dayTasksSchema;
  }

  addItem(item) {
    this._calendarColumn.append(item);
  }
}

export default CalendarColumn;
