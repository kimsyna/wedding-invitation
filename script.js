window.addEventListener('scroll', () => {
	const container = document.getElementById('container');
	const scrollY = window.scrollY;
	const stageHeight = window.innerHeight;

	if (scrollY < stageHeight * 0.5) {
		container.classList.remove('stage1', 'stage2'); // 💌 상태
	} else if (scrollY >= stageHeight * 0.5 && scrollY < stageHeight * 1.5) {
		container.classList.add('stage1');
		container.classList.remove('stage2'); // 내용 상태
	} else {
		container.classList.add('stage2'); // 최종 문구 상태
	}
});
