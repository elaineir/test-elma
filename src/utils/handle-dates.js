import { dateSettings } from '../config/constants';

const refineToString = (date) =>
  new Date(date).toLocaleDateString(dateSettings.locale, dateSettings.options);

const refineToNumericDDMM = (date) =>
  new Date(date).toLocaleDateString(dateSettings.locale, dateSettings.numeric);

const refineToNumericYYMMDD = (date) => new Date(date).toLocaleDateString('en-CA');

export { refineToString, refineToNumericDDMM, refineToNumericYYMMDD };
