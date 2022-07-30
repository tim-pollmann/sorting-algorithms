import ArrayElement from './ArrayElement';
import Visualizer from './Visualizer';

customElements.define('please-do-not-use', ArrayElement, { extends: 'div' });
customElements.define('please-do-not-use-either', Visualizer, { extends: 'div' });

const visualizer = new Visualizer();
document.body.appendChild(visualizer);

visualizer.generateArray(100);
visualizer.mergeSort();
