export const numberAnimation = (
  el: HTMLElement,
  oldValue: number,
  newValue: number
) => {
  let start: number;
  const duration = 300;

  const step = (timestamp: number): void => {
    if (!start) {
      start = timestamp;
    }

    const progress = timestamp - start;

    el.innerHTML = `
          ${Math.round(
            oldValue + ((newValue - oldValue) * progress) / duration
          )}
        `;

    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      el.innerHTML = `${newValue}`;
    }
  };

  el.innerHTML = `${oldValue}`;

  window.requestAnimationFrame(step);
};
