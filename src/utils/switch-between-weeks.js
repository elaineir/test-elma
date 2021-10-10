import ProjectState from '../state/ProjectState';
import { fullDayInMilliseconds, weekButtonsSelectors } from '../config/constants';

const initSwitchBetweenWeeks = (clearContainerCallback, renderCallback) => {
  const showNextWeek = () => {
    clearContainerCallback();
    ProjectState.startDay += fullDayInMilliseconds * 7;
    renderCallback();
  };

  const showPrevWeek = () => {
    clearContainerCallback();
    ProjectState.startDay -= fullDayInMilliseconds * 7;
    renderCallback();
  };

  const nextWeekButton = document.querySelector(weekButtonsSelectors.nextWeekButton);
  const prevWeekButton = document.querySelector(weekButtonsSelectors.prevWeekButton);

  nextWeekButton.addEventListener('click', showNextWeek);
  prevWeekButton.addEventListener('click', showPrevWeek);
};

export default initSwitchBetweenWeeks;
