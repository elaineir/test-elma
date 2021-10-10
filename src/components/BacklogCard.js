import Component from './Component';
import { refineDate } from '../utils/handle-dates';

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
    }
  ) {
    super({ templateSelector, elementSelector });
    this._cardData = cardData;
    this._backlogCard = super._getTemplate();
    this._cardTitle = this._backlogCard.querySelector(titleSelector);
    this._cardDescription = this._backlogCard.querySelector(descriptionSelector);
    this._cardStartDate = this._backlogCard.querySelector(startDateSelector);
    this._cardEndDate = this._backlogCard.querySelector(endDateSelector);
  }

  createCard() {
    this._cardTitle.textContent = this._cardData.subject;
    this._cardDescription.textContent = this._cardData.description;
    this._cardStartDate.textContent = refineDate(this._cardData.planStartDate);
    this._cardEndDate.textContent = refineDate(this._cardData.planEndDate);
    this._backlogCard.setAttribute('id', this._cardData.id);

    return this._backlogCard;
  }
}

export default BacklogCard;
