import ArrayElement from './ArrayElement';
import Visualizer from './Visualizer';

customElements.define('please-do-not-use', ArrayElement, { extends: 'div' });
customElements.define('please-do-not-use-either', Visualizer, { extends: 'div' });

const app = document.getElementById('app') as HTMLDivElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;
const algorithms = document.getElementsByName('algorithm');
const numberOfArrayElementsSlider = document.getElementById('arraySize') as HTMLInputElement;
const speeds = document.getElementsByName('speed');
const toolbar = document.getElementById('toolbar') as HTMLDivElement;
const generateArrayButton = document.getElementById('generateArrayButton') as HTMLButtonElement;
const visualizer = new Visualizer();

const evaluateSpeed = () => {
  for (let i = 0; i < speeds.length; i++) {
    const speed = speeds[i] as HTMLInputElement;
    if (speed.checked) {
      return speed.value;
    }
  }
  return 'undefined';
};

const evaluateAlgorithm = () => {
  for (let i = 0; i < algorithms.length; i++) {
    const algorithm = algorithms[i] as HTMLInputElement;

    if (algorithm.checked) {
      return algorithm.value;
    }
  }

  return 'undefined';
};

const evaluateNumberOfArrayElements = () => parseInt(numberOfArrayElementsSlider.value, 10);

startButton.addEventListener('click', async () => {
  toolbar.className = 'disabled';
  visualizer.resetColors();

  const speed = evaluateSpeed();
  visualizer.setSpeed(speed);

  const algorithmName = evaluateAlgorithm();
  await visualizer.doAlgorithm(algorithmName);

  toolbar.className = '';
});

numberOfArrayElementsSlider.addEventListener('input', () => {
  visualizer.generateArray(evaluateNumberOfArrayElements());
});

generateArrayButton.addEventListener('click', () => {
  visualizer.generateArray(evaluateNumberOfArrayElements());
});

app.appendChild(visualizer);
visualizer.generateArray(evaluateNumberOfArrayElements());
