window.addEventListener('scroll', () => {
	const container = document.getElementById('container');
	// script.js 예시
	const y = window.scrollY;
	const vh = window.innerHeight;

	if (y < vh * 0.5) {
		container.classList.remove('stage1', 'stage2');
	} else if (y < vh * 1.5) {
		container.classList.add('stage1');
		container.classList.remove('stage2');
	} else {
		container.classList.add('stage2');
	}
});

