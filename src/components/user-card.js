import { usersCardSelectors } from '../config/constants';
import { getTemplate } from '../scripts/render-card';

const { templateSelector, elementSelector, userNameSelector } = usersCardSelectors;

const createUserCard = ({ id, firstName, surname }) => {
  const userCard = getTemplate({
    templateSelector,
    elementSelector,
  });
  const fullNameElement = userCard.querySelector(userNameSelector);
  fullNameElement.textContent = `${firstName} ${surname}`;

  userCard.setAttribute('id', id);

  return userCard;
};

export default createUserCard;
