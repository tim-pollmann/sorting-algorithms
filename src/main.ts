const main = async () => {
	const app: HTMLElement | null = document.getElementById('app');
	const visualizer: HTMLElement | null = document.getElementById('visualizer');

	if (app == null || visualizer == null) {
		return;
	}

	
	const array = Array.from({length: 40}, () => Math.floor(Math.random() * 40));

	for (let i = 0; i  < array.length; i++) {
		const newelem = document.createElement('div');
		newelem.innerHTML = array[i].toString();
		newelem.className = 'element';
		visualizer.appendChild(newelem);
	}

	console.log(array);
	await new Promise(resolve => setTimeout(resolve, 3000));

	for (let i = array.length; i > 1; i--){
		for (let j = 0; j < i; j++){
			if (array[i] < array[j]) {
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
	}

	visualizer.innerHTML = '';

	for (let i = 0; i  < array.length; i++) {
		const newelem = document.createElement('div');
		newelem.innerHTML = array[i].toString();
		newelem.className = 'element';
		visualizer.appendChild(newelem);
	}
	

	console.log(array);

	//app.innerHTML = 'HELLLO';
};

main();


export { };