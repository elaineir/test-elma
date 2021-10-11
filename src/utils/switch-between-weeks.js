import ProjectState from '../state/ProjectState';
import { fullDayInMilliseconds, weekButtonsSelectors } from '../config/constants';

const initSwitchBetweenWeeks = (
  clearContainerCallback,
  clearDatesCallback,
  renderDates,
  renderCellsCallback
) => {
  const showNextWeek = () => {
    clearContainerCallback();
    clearDatesCallback();
    ProjectState.startDay += fullDayInMilliseconds * 7;
    renderDates();
    renderCellsCallback();
  };

  const showPrevWeek = () => {
    clearContainerCallback();
    clearDatesCallback();
    ProjectState.startDay -= fullDayInMilliseconds * 7;
    renderDates();
    renderCellsCallback();
  };

  const nextWeekButton = document.querySelector(weekButtonsSelectors.nextWeekButton);
  const prevWeekButton = document.querySelector(weekButtonsSelectors.prevWeekButton);

  nextWeekButton.addEventListener('click', showNextWeek);
  prevWeekButton.addEventListener('click', showPrevWeek);
};

export default initSwitchBetweenWeeks;
