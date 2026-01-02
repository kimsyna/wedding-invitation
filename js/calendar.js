// js/calendar.js

const initCalendar = () => {
  const {
    GROOM_NAME, BRIDE_NAME,
    EVENT_DATE_TEXT, EVENT_TIME_TEXT,
  } = window.DATA;

  const eventDate = new Date(2026, 4, 17, 10, 30); // May is month 4 (0-indexed)

  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let html = `<div class="calendar-header">${year} / ${String(month + 1).padStart(2, "0")} / ${String(eventDate.getDate()).padStart(2, "0")}</div>`;
    html += "<table><thead><tr>";
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    html += days.map((d) => `<th>${d}</th>`).join("");
    html += "</tr></thead><tbody><tr>";
    for (let i = 0; i < firstDay; i++) html += "<td></td>";
    for (let d = 1; d <= lastDate; d++) {
      const isEvent = d === eventDate.getDate();
      html += `<td>${isEvent ? '<span class="event-day">' + d + '</span>' : d}</td>`;
      if ((firstDay + d) % 7 === 0 && d !== lastDate) html += "</tr><tr>";
    }
    html += "</tr></tbody></table>";
    calendarEl.innerHTML = html;
    const eventDayEl = calendarEl.querySelector(".event-day");
    if (eventDayEl) {
      const activate = () => eventDayEl.classList.add("heart-active");
      const deactivate = () => eventDayEl.classList.remove("heart-active");
      calendarEl.addEventListener("mousedown", activate);
      calendarEl.addEventListener("touchstart", (e) => {
        // e.preventDefault(); // allow scrolling
        activate();
      }, { passive: true });
      calendarEl.addEventListener("mouseup", deactivate);
      calendarEl.addEventListener("mouseleave", deactivate);
      calendarEl.addEventListener("touchend", deactivate);
      calendarEl.addEventListener("touchcancel", deactivate);
    }
  }

  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    countdownEl.innerHTML = `
      <div class="countdown-item"><span class="countdown-num" id="cd-days">00</span><span class="countdown-label">DAYS</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-hours">00</span><span class="countdown-label">HRS</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-minutes">00</span><span class="countdown-label">MIN</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-seconds">00</span><span class="countdown-label">SEC</span></div>
    `;
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");
    const introEl = document.querySelector(".countdown-intro");
    const titleEl = countdownEl.previousElementSibling;
    const completeBtn = document.getElementById("countdown-complete-btn");
    if (completeBtn) completeBtn.style.display = "none";

    const showThanks = () => {
      if (introEl) {
        introEl.innerHTML =
          `${GROOM_NAME} & ${BRIDE_NAME}<span class="count-thin">의</span><br />결혼식<span class="count-thin">에</span> <span class="count-thin">참석해주셔서</span><br /><span class="count-thin">진심으로 감사드립니다.</span>`;
      }
      if (titleEl) titleEl.style.display = "none";
      countdownEl.style.display = "none";
      const btn = document.getElementById("countdown-complete-btn");
      if (btn) btn.style.display = "none";
    };

    let countdownTimer;
    const updateCountdown = () => {
      const now = new Date();
      let diff = eventDate - now;
      if (diff <= 0) {
        diff = 0;
        clearInterval(countdownTimer);
        if (completeBtn) completeBtn.style.display = "inline-block";
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    };
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        clearInterval(countdownTimer);
        showThanks();
      });
    }
  }
};

window.initCalendar = initCalendar;
