import { searchFormSelectors, timerDelay } from '../config/constants';
import ProjectState from '../state/ProjectState';

const initSearch = (container, createCardCallback, renderCallback) => {
  const searchForm = document.querySelector(searchFormSelectors.searchForm);
  const searchInput = searchForm.querySelector(searchFormSelectors.searchInput);
  const submitButton = searchForm.querySelector(searchFormSelectors.submitButton);

  const handleSearch = (evt) => {
    evt.preventDefault();
    const keyword = searchInput.value;
    let result;
    if (keyword.length) {
      result = ProjectState.backlogTasks.filter((task) =>
        task.subject.toLowerCase().includes(keyword.toLowerCase())
      );
      container.clearItems();

      if (result.length) {
        result.forEach((task) => {
          const backlogCard = createCardCallback(task);
          container.addItem(backlogCard);
        });
      } else {
        container.addTextContent('Ничего не нашлось');
        submitButton.disabled = true;
        setTimeout(() => {
          container.clearItems();
          renderCallback();
          submitButton.disabled = false;
        }, timerDelay);
      }
    }
  };

  searchForm.addEventListener('submit', handleSearch);
};

export default initSearch;
