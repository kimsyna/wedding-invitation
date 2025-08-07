window.addEventListener('scroll', () => {
        const container = document.getElementById('container');
        // script.js 예시
        const y = window.scrollY;
        const vh = window.innerHeight;
        if (y < vh * 0.5) {
                container.classList.remove('stage1', 'stage2');
                container.style.display = '';
        } else if (y < vh * 1.5) {
                container.classList.add('stage1');
                container.classList.remove('stage2');
                container.style.display = '';
        } else if (y < vh * 2.5) {
                container.classList.add('stage1');
                container.classList.add('stage2');
                container.style.display = '';
        } else {
                container.style.display = 'none';
        }
});

