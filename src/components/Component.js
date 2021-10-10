class Component {
  constructor({ templateSelector, elementSelector }) {
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
  }

  _getTemplate() {
    this._template = document.querySelector(this._templateSelector).content;
    // сам элемент
    return this._template.querySelector(this._elementSelector).cloneNode(true);
  }
}

export default Component;
