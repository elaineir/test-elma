import Component from './Component';
import ProjectState from '../state/ProjectState';
import { refineToNumericDDMM } from '../utils/handle-dates';

class CalendarDate extends Component {
  constructor({ date }, { templateSelector, elementSelector, currentDayClass }) {
    super({ templateSelector, elementSelector });
    this._date = date;
    this._currentDayClass = currentDayClass;
    this._dateElement = super._getTemplate();
  }

  createElement() {
    const cellDate = new Date(this._date);
    this._dateElement.textContent = refineToNumericDDMM(cellDate);
    if (this._date === ProjectState.currentDateNumeric) {
      this._dateElement.classList.add(this._currentDayClass);
    }
    return this._dateElement;
  }
}

export default CalendarDate;
