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

  addTextContent(content) {
    this._container.textContent = content;
  }
}

export default RendererSection;
