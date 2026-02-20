export function startAnimation(slider, callback) {
  let interval = setInterval(() => {
    let year = parseInt(slider.value);

    if (year < 2025) {
      year++;
      slider.value = year;
      callback();
    }
  }, 800);

  return interval;
}

export function stopAnimation(interval) {
  clearInterval(interval);
}
