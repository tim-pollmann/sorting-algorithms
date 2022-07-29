import sleep from './helper/sleep';

class Element extends HTMLDivElement{
	value: number;
	constructor(value: number) {
		super();
		this.value = value;
		this.innerHTML = value.toString();
		this.className = 'element';
		this.style.height = (value * 10).toString() + 'px';
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

	
	for (const element of Array.from({length: 40}, () => new Element(Math.floor(Math.random() * 40)))) {
		visualizer.append(element);
	}

	for (let i = visualizer.children.length; i > 1; i--){
		for (let j = 0; j < i-1; j++){
			if ((visualizer.children[j+1] as Element).value < (visualizer.children[j] as Element).value) {
				visualizer.swapWithLower(j+1);
				await sleep(20);
			}
		}
	}

};
customElements.define('element-lul', Element, { extends: 'div' });
customElements.define('element-lul2', Visualizer, { extends: 'div' });

main();


export { };