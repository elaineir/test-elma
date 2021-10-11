import ProjectState from '../state/ProjectState';
import RendererSection from './RendererSection';
import { ASSIGN_BY_DATE } from '../state/types';
import { calendarCellSelectors, calendarTaskSelectors } from '../config/constants';

class Calendar extends RendererSection {
  constructor(containerSelector) {
    super(containerSelector);
    this._handleDragOver = this._handleDragOver.bind(this);
    this._handleDragLeave = this._handleDragLeave.bind(this);
    this._handleDrop = this._handleDrop.bind(this);
  }

  _handleDragOver(evt) {
    const { target } = evt;
    if (
      evt.dataTransfer &&
      evt.dataTransfer.types[0] === 'text/plain' &&
      (target.classList.contains(calendarCellSelectors.elementClass) ||
        target.classList.contains(calendarTaskSelectors.elementClass))
    ) {
      evt.preventDefault();
      this._droppableCell = target.closest(calendarCellSelectors.elementSelector);
      this._droppableCell.classList.add(calendarCellSelectors.dragOverClass);
    }
  }

  _handleDragLeave() {
    this._droppableCell.classList.remove(calendarCellSelectors.dragOverClass);
  }

  _handleDrop(evt) {
    evt.preventDefault();
    const taskId = evt.dataTransfer.getData('text/plain');
    ProjectState.assignTask({
      type: ASSIGN_BY_DATE,
      taskId,
      executorId: this._droppableCell.dataset.executor,
      startDate: this._droppableCell.dataset.date,
    });
    this._handleDragLeave();
  }

  setEventListeners() {
    this._container.addEventListener('dragover', this._handleDragOver);
    this._container.addEventListener('dragleave', this._handleDragLeave);
    this._container.addEventListener('drop', this._handleDrop);
  }
}

export default Calendar;
