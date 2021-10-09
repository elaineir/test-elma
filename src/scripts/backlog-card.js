import { backlogCardSelectors, dateSettings } from '../config/constants';
import { getTemplate } from './render-card';

const {
  templateSelector,
  elementSelector,
  titleSelector,
  descriptionSelector,
  startDateSelector,
  endDateSelector,
} = backlogCardSelectors;

const createBacklogCard = ({ id, subject, description, planStartDate, planEndDate }) => {
  const backlogCard = getTemplate({
    templateSelector,
    elementSelector,
  });
  const cardTitle = backlogCard.querySelector(titleSelector);
  const cardDescription = backlogCard.querySelector(descriptionSelector);
  const cardStartDate = backlogCard.querySelector(startDateSelector);
  const cardEndDate = backlogCard.querySelector(endDateSelector);

  cardTitle.textContent = subject;
  cardDescription.textContent = description;
  cardStartDate.textContent = new Date(planStartDate).toLocaleDateString(
    dateSettings.locale,
    dateSettings.options
  );
  cardEndDate.textContent = new Date(planEndDate).toLocaleDateString(
    dateSettings.locale,
    dateSettings.options
  );

  backlogCard.setAttribute('id', id);

  return backlogCard;
};

export default createBacklogCard;
