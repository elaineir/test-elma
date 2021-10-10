import Component from './Component';
import ProjectState from '../state/ProjectState';
import { ASSIGN_BY_USER } from '../state/types';

class UserCard extends Component {
  constructor(cardData, { templateSelector, elementSelector, userNameSelector, dragOverClass }) {
    super({ templateSelector, elementSelector });
    this._cardData = cardData;
    this._userCard = super._getTemplate();
    this._fullNameElement = this._userCard.querySelector(userNameSelector);
    this._dragOverClass = dragOverClass;
    this._handleDragOver = this._handleDragOver.bind(this);
    this._handleDragLeave = this._handleDragLeave.bind(this);
    this._handleDrop = this._handleDrop.bind(this);
  }

  createCard() {
    this._fullNameElement.textContent = `${this._cardData.firstName} ${this._cardData.surname}`;
    return this._userCard;
  }

  _handleDragOver(evt) {
    if (evt.dataTransfer && evt.dataTransfer.types[0] === 'text/plain') {
      evt.preventDefault();
      this._userCard.classList.add(this._dragOverClass);
    }
  }

  _handleDragLeave() {
    this._userCard.classList.remove(this._dragOverClass);
  }

  _handleDrop(evt) {
    const taskId = evt.dataTransfer.getData('text/plain');
    ProjectState.assignTask({ type: ASSIGN_BY_USER, taskId, executorId: this._cardData.id });
    this._handleDragLeave();
  }

  setEventListeners() {
    this._userCard.addEventListener('dragover', this._handleDragOver);
    this._userCard.addEventListener('dragleave', this._handleDragLeave);
    this._userCard.addEventListener('drop', this._handleDrop);
  }
}

export default UserCard;
