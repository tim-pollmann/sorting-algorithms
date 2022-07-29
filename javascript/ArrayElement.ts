export default class extends HTMLDivElement {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
    this.className = 'array-element standard';
    this.style.height = `${value.toString()}%`;
  }

  setFinished() {
    this.className = 'array-element finished';
  }

  setHighlighted() {
    this.className = 'array-element highlighted';
  }

  resetColor() {
    this.className = 'array-element standard';
  }
}
