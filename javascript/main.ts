import sleep from './helper/sleep';

class Element extends HTMLDivElement{
	value: number;
	constructor(value: number) {
		super();
		this.value = value;
		//this.innerHTML = value.toString();
		this.className = 'element blue';
		this.style.height = value.toString() + '%';
	}

	setFinished(){
		this.className = 'element green';
	}

	setHighest(){
		this.className = 'element red';
	}

	resetColor(){
		this.className = 'element blue';
	}
}

class Visualizer extends HTMLDivElement{
	constructor() {
		super();
		this.id = 'visualizer';
	}

	swapWithLower(idx: number){
		this.insertBefore(this.children[idx], this.children[idx-1]);
	}
}

const main = async () => {
	const app: HTMLElement | null = document.getElementById('app');
	const visualizer = new Visualizer();

	if (app == null || visualizer == null) {
		return;
	}

	app.appendChild(visualizer);

	
	for (const element of Array.from({length: 40}, () => new Element(Math.floor(Math.random() * 100) + 1))) {
		visualizer.append(element);
	}

	(visualizer.children[0] as Element).setHighest();

	for (let i = visualizer.children.length; i > 1; i--){
		for (let j = 0; j < i-1; j++){
			const childLeft = visualizer.children[j] as Element;
			const childRight = visualizer.children[j+1] as Element;

			if (childRight.value < childLeft.value) {
				visualizer.swapWithLower(j+1);
			} else {
				childLeft.resetColor();
				childRight.setHighest();
			}

			await sleep(50);
		}

		(visualizer.children[i-1] as Element).setFinished();
	}

	(visualizer.children[0] as Element).setFinished();
};
customElements.define('element-lul', Element, { extends: 'div' });
customElements.define('element-lul2', Visualizer, { extends: 'div' });

main();


export { };