export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderer() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }

  addCards(element) {
    this._container.append(element);
  }
}

/*export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }
  
  setItem(item) {
    this._container.prepend(item);
  }
  
  setCards(element) {
    this._container.append(element);
  }

}


setItems(items){
  this._renderItems = items; 
}

prepend(item){
this._renderItems = [item, ...this._renderItems];
this.renderItems();
}

clear(){
  this._container.innerHTML = '';
}

prependItem(item) {
  this._renderItems = [item, ...this._renderItems];
}*/

