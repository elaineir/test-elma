import Component from './Component';
import { refineToString } from '../utils/handle-dates';

class CalendarTask extends Component {
  constructor(
    task,
    {
      templateSelector,
      elementSelector,
      titleSelector,
      subtitleSelector,
      descriptionSelector,
      startDateSelector,
      endDateSelector,
    }
  ) {
    super({ templateSelector, elementSelector });
    this._task = task;
    this._taskElement = super._getTemplate();
    this._titleELement = this._taskElement.querySelector(titleSelector);
    this._subtitleELement = this._taskElement.querySelector(subtitleSelector);
    this._descriptionElement = this._taskElement.querySelector(descriptionSelector);
    this._startDateElement = this._taskElement.querySelector(startDateSelector);
    this._endDateElement = this._taskElement.querySelector(endDateSelector);
  }

  createElement() {
    this._titleELement.textContent = this._task.subject;
    this._subtitleELement.textContent = this._task.subject;
    this._descriptionElement.textContent = this._task.description;
    this._startDateElement.textContent = refineToString(this._task.planStartDate);
    this._endDateElement.textContent = refineToString(this._task.planEndDate);

    return this._taskElement;
  }
}

export default CalendarTask;
