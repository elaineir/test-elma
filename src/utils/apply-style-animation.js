const removeAnimation = (element) => {
  // удаление для восстановления уровней наложения и доступности свойства transform
  setTimeout(() => {
    element.removeAttribute('style');
  }, 1100);
};

export const applySlideInBottomUpAnim = (element, index, lastIndex) => {
  if (index <= lastIndex) {
    element.setAttribute(
      'style',
      `animation: slide-in-bottom-up 0.5s ease-out 0.${index}s forwards; opacity: 0;`
    );
    removeAnimation(element);
  }
};

export const applySlideInRightLeftAnim = (element, index, lastIndex) => {
  if (index <= lastIndex) {
    element.setAttribute(
      'style',
      `animation: slide-in-right-left 0.5s ease-out 0.${index}s forwards; opacity: 0;`
    );
    removeAnimation(element);
  }
};
