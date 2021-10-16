import ProjectState from '../state/ProjectState';
import Component from './Component';
import CalendarCell from './CalendarCell';
import { calendarCellSelectors } from '../config/constants';

class CalendarColumn extends Component {
  constructor(column, { templateSelector, elementSelector }) {
    super({ templateSelector, elementSelector });
    this._column = column;
    this._calendarColumn = super._getTemplate();
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
      const cellElement = columnCell.createElement();
      columnCell.renderItems();
      this.addItem(cellElement);
    }
  }

  createElement() {
    this.createCells();
    return this._calendarColumn;
  }

  addItem(item) {
    this._calendarColumn.append(item);
  }
}

export default CalendarColumn;
