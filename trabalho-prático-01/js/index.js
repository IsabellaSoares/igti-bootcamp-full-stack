const start = () => {
  const redText = document.querySelector('#redText');
  const redRange = document.querySelector('#redRange');
  const greenText = document.querySelector('#greenText');
  const greenRange = document.querySelector('#greenRange');
  const blueText = document.querySelector('#blueText');
  const blueRange = document.querySelector('#blueRange');
  const colorDiv = document.querySelector('#color');

  const applyRedInput = (value) => {
    redText.value = value;
  };

  const applyGreenInput = (value) => {
    greenText.value = value;
  };

  const applyBlueInput = (value) => {
    blueText.value = value;
  };

  const applyBackgroundColor = () => {
    colorDiv.style.backgroundColor = `rgb(${redRange.value}, ${greenRange.value},${blueRange.value})`;
  };

  applyRedInput(redRange.value);
  applyGreenInput(greenRange.value);
  applyBlueInput(blueRange.value);
  applyBackgroundColor();

  redRange.addEventListener('change', (event) => {
    applyRedInput(event.target.value);
    applyBackgroundColor();
  });

  greenRange.addEventListener('change', (event) => {
    applyGreenInput(event.target.value);
    applyBackgroundColor();
  });

  blueRange.addEventListener('change', (event) => {
    applyBlueInput(event.target.value);
    applyBackgroundColor();
  });
};

window.addEventListener('load', start);
