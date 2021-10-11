import Component from './Component';
import { refineToString } from '../utils/handle-dates';

class BacklogCard extends Component {
  constructor(
    cardData,
    {
      templateSelector,
      elementSelector,
      titleSelector,
      descriptionSelector,
      startDateSelector,
      endDateSelector,
      dragStartClass,
    }
  ) {
    super({ templateSelector, elementSelector });
    this._cardData = cardData;
    this._backlogCard = super._getTemplate();
    this._dragStartClass = dragStartClass;
    this._cardTitle = this._backlogCard.querySelector(titleSelector);
    this._cardDescription = this._backlogCard.querySelector(descriptionSelector);
    this._cardStartDate = this._backlogCard.querySelector(startDateSelector);
    this._cardEndDate = this._backlogCard.querySelector(endDateSelector);
    this._handleDragStart = this._handleDragStart.bind(this);
    this._handleDragEnd = this._handleDragEnd.bind(this);
  }

  _handleDragStart(evt) {
    this._backlogCard.classList.add(this._dragStartClass);
    evt.dataTransfer.setData('text/plain', this._cardData.id);
    evt.dataTransfer.effectAllowed = 'move';
  }

  _handleDragEnd() {
    this._backlogCard.classList.remove(this._dragStartClass);
  }

  createCard() {
    this._cardTitle.textContent = this._cardData.subject;
    this._cardDescription.textContent = this._cardData.description;
    this._cardStartDate.textContent = refineToString(this._cardData.planStartDate);
    this._cardEndDate.textContent = refineToString(this._cardData.planEndDate);
    this._backlogCard.setAttribute('id', this._cardData.id);
    return this._backlogCard;
  }

  setEventListeners() {
    this._backlogCard.addEventListener('dragstart', this._handleDragStart);
    this._backlogCard.addEventListener('dragend', this._handleDragEnd);
  }
}

export default BacklogCard;
