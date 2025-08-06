window.addEventListener('scroll', () => {
	const container = document.getElementById('container');
        // 스크롤 위치에 따라 container에 stage 클래스를 적용
        // 0~0.5vh: 봉투 / 0.5~1.5vh: 본문 / 1.5vh~ : 결혼합니다 메시지
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

