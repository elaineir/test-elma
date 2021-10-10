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
    }, 3000);
  }
}

export default PopupError;
