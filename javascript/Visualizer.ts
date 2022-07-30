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

  insertBeforeReferenceNode = (idx: number, referenceNodeIdx: number) => {
    this.insertBefore(this.children[idx], this.children[referenceNodeIdx]);
  };

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

  mergeSort = async () => {
    const merge = async (leftIdx: number, middleIdx: number, rightIdx: number) => {
      let mIdx = middleIdx;
      let i = leftIdx;
      let j = middleIdx + 1;

      while (i <= mIdx && j <= rightIdx) {
        const leftArrayElement = this.children[i] as ArrayElement;
        const rightArrayElement = this.children[j] as ArrayElement;

        leftArrayElement.setHighlighted();
        rightArrayElement.setHighlighted();

        await sleep(10);

        if (leftArrayElement.value <= rightArrayElement.value) {
          i++;
        } else {
          this.insertBeforeReferenceNode(j, i);
          i++;
          mIdx++;
          j++;
        }

        leftArrayElement.resetColor();
        rightArrayElement.resetColor();
      }
    };

    const sort = async (leftIdx: number, rightIdx: number) => {
      if (leftIdx < rightIdx) {
        const middleIdx = Math.floor((leftIdx + rightIdx) / 2);

        await sort(leftIdx, middleIdx);
        await sort(middleIdx + 1, rightIdx);
        await merge(leftIdx, middleIdx, rightIdx);
      }
    };

    sort(0, this.children.length - 1);
  };
}
