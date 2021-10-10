export const getTemplate = ({ templateSelector, elementSelector }) => {
  const template = document.querySelector(templateSelector).content;
  // сам элемент
  return template.querySelector(elementSelector).cloneNode(true);
};

export const render = () => {};
