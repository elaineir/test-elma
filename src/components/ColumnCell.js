import Component from './Component';

class ColumnCell extends Component {
  constructor(cell, { templateSelector, elementSelector, titleSelector }) {
    super({ templateSelector, elementSelector });
    this._cell = cell;
    this._cellElement = super._getTemplate();
    this._titleElement = this._cellElement.querySelector(titleSelector);
  }

  createCell() {
    this._titleElement.textContent = this._cell.tasks.length;

    this._cellElement.setAttribute('data-executor', this._cell.executor);
    this._cellElement.setAttribute('data-date', this._cell.date);

    return this._cellElement;
  }
}

export default ColumnCell;
