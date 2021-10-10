class RendererSection {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
    this.clearItems = this.clearItems.bind(this);
  }

  addItem(item) {
    this._container.append(item);
  }

  clearItems() {
    this._container.textContent = '';
  }
}

export default RendererSection;
