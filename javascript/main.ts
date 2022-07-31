import ArrayElement from './ArrayElement';
import Visualizer from './Visualizer';

const init = () => {
  customElements.define('please-do-not-use', ArrayElement, { extends: 'div' });
  customElements.define('please-do-not-use-either', Visualizer, { extends: 'div' });

  const startButton = document.getElementById('startButton') as HTMLButtonElement;
  const algorithmSelect = document.getElementById('algorithmSelect') as HTMLSelectElement;
  const numberOfArrayElementsSlider = document.getElementById('numberOfArrayElementsSlider') as HTMLInputElement;
  const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
  const toolbar = document.getElementById('toolbar');
  const generateArrayButton = document.getElementById('generateArrayButton');

  if (startButton == null
        || algorithmSelect == null
        || numberOfArrayElementsSlider == null
        || speedSlider == null
        || toolbar == null
        || generateArrayButton == null) {
    return;
  }

  const visualizer = new Visualizer();
  document.body.appendChild(visualizer);
  visualizer.generateArray(parseInt(numberOfArrayElementsSlider.value, 10));
  visualizer.setSpeed(parseInt(speedSlider.value, 10));

  startButton.addEventListener('click', async () => {
    toolbar.className = 'disabled';
    visualizer.resetColors();
    visualizer.setSpeed(parseInt(speedSlider.value, 10));

    switch (algorithmSelect.value) {
      case 'bubbleSort':
        await visualizer.insertionSort();
        break;
      case 'mergeSort':
        await visualizer.mergeSort();
        break;
      default:
        break;
    }

    toolbar.className = '';
  });

  numberOfArrayElementsSlider.addEventListener('input', () => {
    visualizer.generateArray(parseInt(numberOfArrayElementsSlider.value, 10));
  });

  generateArrayButton.addEventListener('click', () => {
    visualizer.generateArray(parseInt(numberOfArrayElementsSlider.value, 10));
  });
};

init();
