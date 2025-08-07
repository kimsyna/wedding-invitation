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

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('rsvp-name').value;
                const attend = document.getElementById('rsvp-attend').checked ? '참석' : '불참';
                alert(`${name}님, ${attend}으로 전송되었습니다.`);
                rsvpForm.reset();
        });
}

