import Component from './Component';

class UserCard extends Component {
  constructor(cardData, { templateSelector, elementSelector, userNameSelector }) {
    super({ templateSelector, elementSelector });
    this._cardData = cardData;
    this._userCard = super._getTemplate();
    this._fullNameElement = this._userCard.querySelector(userNameSelector);
  }

  createCard() {
    this._fullNameElement.textContent = `${this._cardData.firstName} ${this._cardData.surname}`;
    this._userCard.setAttribute('id', this._cardData.id);

    return this._userCard;
  }
}

export default UserCard;
