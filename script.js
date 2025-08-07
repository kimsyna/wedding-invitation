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

// 추가 기능: 달력, 남은 시간, 공유 버튼
document.addEventListener('DOMContentLoaded', () => {
        const eventDate = new Date(2026, 4, 17, 10, 30);

        const calendarEl = document.getElementById('calendar');
        if (calendarEl) {
                const year = eventDate.getFullYear();
                const month = eventDate.getMonth();
                const firstDay = new Date(year, month, 1).getDay();
                const lastDate = new Date(year, month + 1, 0).getDate();
                let html = '<table><thead><tr>';
                const days = ['일', '월', '화', '수', '목', '금', '토'];
                html += days.map((d) => `<th>${d}</th>`).join('');
                html += '</tr></thead><tbody><tr>';
                for (let i = 0; i < firstDay; i++) html += '<td></td>';
                for (let d = 1; d <= lastDate; d++) {
                        const isEvent = d === eventDate.getDate();
                        html += `<td${isEvent ? ' class="event-day"' : ''}>${d}</td>`;
                        if ((firstDay + d) % 7 === 0 && d !== lastDate) html += '</tr><tr>';
                }
                html += '</tr></tbody></table>';
                calendarEl.innerHTML = html;
        }

        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
                const updateCountdown = () => {
                        const now = new Date();
                        const diff = eventDate - now;
                        if (diff <= 0) {
                                countdownEl.textContent = '예식이 시작되었습니다!';
                                return;
                        }
                       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                       const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                       const minutes = Math.floor((diff / (1000 * 60)) % 60);
                       const seconds = Math.floor((diff / 1000) % 60);
                       const parts = [];
                       if (days > 0) parts.push(`${days}일`);
                       if (hours > 0) parts.push(`${hours}시간`);
                       if (minutes > 0) parts.push(`${minutes}분`);
                       if (seconds > 0) parts.push(`${seconds}초`);
                       countdownEl.textContent = parts.length ? `${parts.join(' ')} 남았습니다` : '';
               };
                updateCountdown();
                setInterval(updateCountdown, 1000);
        }

        const shareUrlBtn = document.getElementById('share-url');
        if (shareUrlBtn) {
                shareUrlBtn.addEventListener('click', async () => {
                        const url = window.location.href;
                        if (navigator.share) {
                                try {
                                        await navigator.share({ title: '청첩장', url });
                                } catch (e) {
                                        console.log(e);
                                }
                        } else {
                                await navigator.clipboard.writeText(url);
                                alert('URL이 복사되었습니다');
                        }
                });
        }

        const shareKakaoBtn = document.getElementById('share-kakao');
        if (shareKakaoBtn && window.Kakao) {
                try {
                        Kakao.init('ad9882a7a0abfaffbde309e333d2e43e');
                        shareKakaoBtn.addEventListener('click', () => {
                                Kakao.Share.sendDefault({
                                        objectType: 'feed',
                                        content: {
                                                title: '이성우♥임상영 청첩장',
                                                description: '2026년 5월 17일 일요일 오전 10시 30분',
                                                imageUrl: 'https://via.placeholder.com/300',
                                                link: {
                                                        mobileWebUrl: window.location.href,
                                                        webUrl: window.location.href,
                                                },
                                        },
                                });
                        });
                } catch (e) {
                        console.log(e);
                }
        }
});

