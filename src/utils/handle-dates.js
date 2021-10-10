import { dateSettings } from '../config/constants';

const refineDate = (date) =>
  new Date(date).toLocaleDateString(dateSettings.locale, dateSettings.options);

const refineToNumericDate = (date) =>
  new Date(date).toLocaleDateString(dateSettings.locale, dateSettings.numeric);

export { refineDate, refineToNumericDate };
