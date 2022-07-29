import ArrayElement from './ArrayElement';
import { sleep } from './helper';

export default class extends HTMLDivElement {
  constructor(numberOfArrayElements: number) {
    super();
    this.id = 'visualizer';

    const arrayElements = Array.from(
      { length: numberOfArrayElements },
      () => new ArrayElement(Math.floor(Math.random() * 100) + 1),
    );

    for (const arrayElement of arrayElements) {
      this.append(arrayElement);
    }
  }

  swapWithLower = (idx: number) => {
    this.insertBefore(this.children[idx], this.children[idx - 1]);
  };

  swap = (idx1: number, idx2: number) => {
    const arrayElement1 = this.children[idx1];
    const arrayElement2 = this.children[idx2];

    const placeholder1 = document.createElement('div');
    const placeholder2 = document.createElement('div');

    this.replaceChild(placeholder1, arrayElement1);
    this.replaceChild(placeholder2, arrayElement2);

    this.replaceChild(arrayElement2, placeholder1);
    this.replaceChild(arrayElement1, placeholder2);
  };

  bubbleSort = async () => {
    const firstArrayElement = this.children[0] as ArrayElement;
    firstArrayElement.setHighlighted();

    for (let i = this.children.length; i > 1; i--) {
      for (let j = 0; j < i - 1; j++) {
        const leftArrayElement = this.children[j] as ArrayElement;
        const rightArrayElement = this.children[j + 1] as ArrayElement;

        if (rightArrayElement.value < leftArrayElement.value) {
          this.swapWithLower(j + 1);
          // this.swap(j, j+1);
        } else {
          leftArrayElement.resetColor();
          rightArrayElement.setHighlighted();
        }

        await sleep(10);
      }

      (this.children[i - 1] as ArrayElement).setFinished();
    }

    const lastArrayElement = this.children[0] as ArrayElement;
    lastArrayElement.setFinished();
  };
}
