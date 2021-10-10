class RendererSection {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.append(item);
  }

  clearItems() {
    this._container.textContent = '';
  }
}

export default RendererSection;
