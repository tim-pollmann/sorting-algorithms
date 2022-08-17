import ArrayElement from './ArrayElement';
import Visualizer from './Visualizer';

const init = () => {
  customElements.define('please-do-not-use', ArrayElement, { extends: 'div' });
  customElements.define('please-do-not-use-either', Visualizer, { extends: 'div' });

  const app = document.getElementById('app');
  const startButton = document.getElementById('startButton') as HTMLButtonElement;
  const algorithms = document.getElementsByName('algorithm');
  const numberOfArrayElementsSlider = document.getElementById('arraySize') as HTMLInputElement;
  const speeds = document.getElementsByName('speed');
  const toolbar = document.getElementById('toolbar');
  const generateArrayButton = document.getElementById('generateArrayButton');

  if (app == null
        || startButton == null
        || algorithms == null
        || numberOfArrayElementsSlider == null
        || speeds == null
        || toolbar == null
        || generateArrayButton == null) {
    return;
  }

  const visualizer = new Visualizer();
  app.appendChild(visualizer);

  visualizer.generateArray(parseInt(numberOfArrayElementsSlider.value, 10));

  startButton.addEventListener('click', async () => {
    toolbar.className = 'disabled';
    visualizer.resetColors();

    for (let i = 0; i < speeds.length; i++) {
      const speed = speeds[i] as HTMLInputElement;
      if (speed.checked) {
        visualizer.setSpeed(speed.value);
        break;
      }
    }

    for (let i = 0; i < algorithms.length; i++) {
      const algorithm = algorithms[i] as HTMLInputElement;

      if (algorithm.checked) {
        switch (algorithm.value) {
          case 'insertionSort':
            await visualizer.insertionSort();
            break;
          case 'selectionSort':
            break;
          case 'bubbleSort':
            await visualizer.bubbleSort();
            break;
          case 'quickSort':
            break;
          case 'mergeSort':
            await visualizer.mergeSort();
            break;
          case 'heapSort':
            break;
          default:
            break;
        }
        break;
      }
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
