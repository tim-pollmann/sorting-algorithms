import ArrayElement from './ArrayElement';
import { sleep } from './helper';

const speedToTimeout : {[speed: string]: number} = {
  slow: 50,
  medium: 25,
  fast: 0,
  undefined: 0,
};

const finishedTimeout = 7;

export default class extends HTMLDivElement {
  timeout: number;

  constructor() {
    super();
    this.id = 'visualizer';
    this.timeout = 0;
  }

  generateArray(numberOfArrayElements: number) {
    this.innerHTML = '';

    const arrayElements = Array.from(
      { length: numberOfArrayElements },
      () => new ArrayElement(Math.floor(Math.random() * 100) + 1),
    );

    for (const arrayElement of arrayElements) {
      this.append(arrayElement);
    }
  }

  setSpeed(speed: string) {
    this.timeout = speedToTimeout[speed];
  }

  insertBeforeArrayElement = (idx: number, idxTarget: number) => {
    this.insertBefore(this.children[idx], this.children[idxTarget]);
  };

  insertAfterArrayElement = (idx: number, idxTarget: number) => {
    this.insertBefore(this.children[idx], this.children[idxTarget + 1]);
  };

  swapWithLowerArrayElement = (idx: number) => {
    this.insertBefore(this.children[idx], this.children[idx - 1]);
  };

  swapArrayElements = (idx1: number, idx2: number) => {
    const arrayElement1 = this.children[idx1];
    const arrayElement2 = this.children[idx2];

    const placeholder1 = document.createElement('div');
    const placeholder2 = document.createElement('div');

    this.replaceChild(placeholder1, arrayElement1);
    this.replaceChild(placeholder2, arrayElement2);

    this.replaceChild(arrayElement2, placeholder1);
    this.replaceChild(arrayElement1, placeholder2);
  };

  resetColors = () => {
    for (let i = 0; i < this.children.length; i++) {
      const arrayElement = this.children[i] as ArrayElement;
      arrayElement.resetColor();
    }
  };

  bubbleSort = async () => {
    const firstArrayElement = this.children[0] as ArrayElement;
    firstArrayElement.setHighlighted();

    for (let i = this.children.length; i > 1; i--) {
      for (let j = 0; j < i - 1; j++) {
        const leftArrayElement = this.children[j] as ArrayElement;
        const rightArrayElement = this.children[j + 1] as ArrayElement;

        if (rightArrayElement.value < leftArrayElement.value) {
          this.swapWithLowerArrayElement(j + 1);
        } else {
          leftArrayElement.resetColor();
          rightArrayElement.setHighlighted();
        }

        await sleep(this.timeout);
      }

      (this.children[i - 1] as ArrayElement).setFinished();
    }

    const lastArrayElement = this.children[0] as ArrayElement;
    lastArrayElement.setFinished();
  };

  mergeSort = async () => {
    const merge = async (leftIdx: number, middleIdx: number, rightIdx: number) => {
      let m = middleIdx;
      let i = leftIdx;
      let j = middleIdx + 1;

      while (i <= m && j <= rightIdx) {
        const leftArrayElement = this.children[i] as ArrayElement;
        const rightArrayElement = this.children[j] as ArrayElement;

        leftArrayElement.setHighlighted();
        rightArrayElement.setHighlighted();

        await sleep(this.timeout);

        if (leftArrayElement.value <= rightArrayElement.value) {
          i++;
        } else {
          this.insertBeforeArrayElement(j, i);
          j++;
          i++;
          m++;
        }

        leftArrayElement.resetColor();
        rightArrayElement.resetColor();

        if (leftIdx === 0 && rightIdx === this.children.length - 1) {
          const arrayElement = this.children[i - 1] as ArrayElement;
          arrayElement.setFinished();
        }
      }

      if (leftIdx === 0 && rightIdx === this.children.length - 1) {
        for (; j < this.children.length; j++) {
          const arrayElement = this.children[j] as ArrayElement;
          arrayElement.setFinished();
        }

        for (; i < this.children.length; i++) {
          const arrayElement = this.children[i] as ArrayElement;
          arrayElement.setFinished();
        }
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

    await sort(0, this.children.length - 1);
  };

  insertionSort = async () => {
    for (let i = 1; i < this.children.length; i++) {
      const arrayElement = this.children[i] as ArrayElement;
      arrayElement.setHighlighted();
      let j = i;

      do {
        await sleep(this.timeout);

        const currentArrayElement = this.children[j - 1] as ArrayElement;
        if (arrayElement.value > currentArrayElement.value) {
          break;
        }

        this.swapWithLowerArrayElement(j);
        j--;
      } while (j > 0);

      arrayElement.resetColor();
    }

    for (let i = 0; i < this.children.length; i++) {
      const arrayElement = this.children[i] as ArrayElement;
      arrayElement.setFinished();
      await sleep(finishedTimeout);
    }
  };

  selectionSort = async () => {
    for (let i = 0; i < this.children.length - 1; i++) {
      let minIdx = i;
      let minValue = (this.children[i] as ArrayElement).value;
      (this.children[i] as ArrayElement).setHighlighted();

      for (let j = i + 1; j < this.children.length; j++) {
        if ((this.children[j] as ArrayElement).value <= minValue) {
          (this.children[minIdx] as ArrayElement).resetColor();
          (this.children[j] as ArrayElement).setHighlighted();

          minIdx = j;
          minValue = (this.children[j] as ArrayElement).value;
          await sleep(this.timeout);
        }
      }

      if (minIdx !== i) {
        this.swapArrayElements(i, minIdx);
        await sleep(this.timeout);
      }

      (this.children[i] as ArrayElement).setFinished();
    }

    (this.children[this.children.length - 1] as ArrayElement).setFinished();
  };

  quickSort = async () => {
    const calculatePivotIdx = (leftIdx: number, rightIdx: number) => Math.floor((leftIdx + rightIdx) / 2);

    const partition = async (leftIdx: number, pivotIdx: number, rightIdx: number) => {
      let newPivotIdx = pivotIdx;
      const pivotValue = (this.children[newPivotIdx] as ArrayElement).value;

      for (let i = leftIdx; i < newPivotIdx; i++) {
        if ((this.children[i] as ArrayElement).value > pivotValue) {
          const arrayElement = this.children[i] as ArrayElement;
          arrayElement.setHighlighted();
          await sleep(this.timeout);
          this.insertAfterArrayElement(i, newPivotIdx);
          arrayElement.resetColor();
          newPivotIdx--;
          i--;
        }
      }

      for (let i = newPivotIdx + 1; i <= rightIdx; i++) {
        if ((this.children[i] as ArrayElement).value < pivotValue) {
          const arrayElement = this.children[i] as ArrayElement;
          arrayElement.setHighlighted();
          await sleep(this.timeout);
          this.insertBeforeArrayElement(i, newPivotIdx);
          arrayElement.resetColor();
          newPivotIdx++;
        }
      }

      return newPivotIdx;
    };

    const sort = async (leftIdx: number, rightIdx: number) => {
      let pivotIdx = calculatePivotIdx(leftIdx, rightIdx);
      (this.children[pivotIdx] as ArrayElement).setHighlighted();

      pivotIdx = await partition(leftIdx, pivotIdx, rightIdx);
      (this.children[pivotIdx] as ArrayElement).resetColor();

      if (leftIdx < pivotIdx - 1) {
        await sort(leftIdx, pivotIdx - 1);
      } else {
        for (let i = leftIdx - 1; i <= pivotIdx; i++) {
          if (i >= 0) {
            (this.children[i] as ArrayElement).setFinished();
          }
        }
      }

      if (rightIdx > pivotIdx + 1) {
        await sort(pivotIdx + 1, rightIdx);
      } else {
        for (let i = pivotIdx; i <= rightIdx + 1; i++) {
          if (i < this.children.length) {
            (this.children[i] as ArrayElement).setFinished();
          }
        }
      }
    };

    await sort(0, this.children.length - 1);
  };

  doAlgorithm = async (algorithmName: string) => {
    const algorithmNameToAlgorithm : {[algorithmName: string]: (() => Promise<void>) | undefined} = {
      insertionSort: this.insertionSort,
      selectionSort: this.selectionSort,
      bubbleSort: this.bubbleSort,
      quickSort: this.quickSort,
      mergeSort: this.mergeSort,
      undefined,
    };

    this.resetColors();

    const algorithm = algorithmNameToAlgorithm[algorithmName];
    if (algorithm) {
      await algorithm();
    }
  };
}
