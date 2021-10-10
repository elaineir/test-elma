import { timerDelay } from '../config/constants';

class PopupError {
  constructor(selectors) {
    this._selectors = selectors;
    this._popup = document.querySelector(selectors.popupError);
  }

  open() {
    this._popup.classList.add(this._selectors.popupOpenClass);
    this._close();
  }

  _close() {
    setTimeout(() => {
      this._popup.classList.remove(this._selectors.popupOpenClass);
    }, timerDelay);
  }
}

export default PopupError;
