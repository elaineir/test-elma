import ProjectState from '../state/ProjectState';
import Component from './Component';
import CalendarCell from './CalendarCell';
import { refineToNumericDDMM } from '../utils/handle-dates';
import { calendarCellSelectors } from '../config/constants';

class CalendarColumn extends Component {
  constructor(column, { templateSelector, elementSelector, dateCellSelector, currentDayClass }) {
    super({ templateSelector, elementSelector });
    this._column = column;
    this._calendarColumn = super._getTemplate();
    this._dateElement = this._calendarColumn.querySelector(dateCellSelector);
    this._currentDayClass = currentDayClass;
    this._dayTasksSchema = {};
  }

  _getTasksForCurrentDay(tasks) {
    const parsedColumnDate = Date.parse(this._column.date);
    return tasks.filter(
      (task) =>
        Date.parse(task.planStartDate) <= parsedColumnDate &&
        parsedColumnDate <= Date.parse(task.planEndDate)
    );
  }

  _getDayTasksSchema() {
    this._tasksForCurrentDay = this._getTasksForCurrentDay(ProjectState.assignedTasks);

    if (this._tasksForCurrentDay) {
      this._tasksForCurrentDay.forEach((task) => {
        if (!this._dayTasksSchema[task.executor]) {
          this._dayTasksSchema[task.executor] = [task];
        } else {
          this._dayTasksSchema[task.executor] = [...this._dayTasksSchema[task.executor], task];
        }
      });
    }
  }

  createCells() {
    this._getDayTasksSchema();
    for (let i = 0; i < ProjectState.users.length; i += 1) {
      const userId = ProjectState.usersIds[i];
      const columnCell = new CalendarCell(
        { executor: userId, date: this._column.date, tasks: this._dayTasksSchema[userId] ?? [] },
        calendarCellSelectors
      );
      const cellElement = columnCell.createCell();
      columnCell.renderItems();
      this.addItem(cellElement);
    }
  }

  createCalendarColumn() {
    const columnDate = new Date(this._column.date);
    this._dateElement.textContent = refineToNumericDDMM(columnDate);
    if (this._column.date === ProjectState.currentDateNumeric) {
      this._calendarColumn.classList.add(this._currentDayClass);
    }
    this.createCells();
    return this._calendarColumn;
  }

  addItem(item) {
    this._calendarColumn.append(item);
  }
}

export default CalendarColumn;
