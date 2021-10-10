import Component from './Component';
import CalendarTask from './CalendarTask';
import { calendarTaskSelectors } from '../config/constants';

class CalendarCell extends Component {
  constructor(cell, { templateSelector, elementSelector }) {
    super({ templateSelector, elementSelector });
    this._cell = cell;
    this._cellElement = super._getTemplate();
  }

  createCell() {
    this._cellElement.setAttribute('data-executor', this._cell.executor);
    this._cellElement.setAttribute('data-date', this._cell.date);

    return this._cellElement;
  }

  addItem(item) {
    this._cellElement.append(item);
  }

  renderItems() {
    this._cell.tasks.forEach((task) => {
      const newTask = new CalendarTask(task, calendarTaskSelectors);
      this.addItem(newTask.createTask());
    });
  }
}

export default CalendarCell;
