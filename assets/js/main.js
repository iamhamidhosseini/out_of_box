function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const savedTheme = localStorage.getItem("oob-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  }

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    if (isDark) {
      document.body.classList.remove("theme-light");
      localStorage.setItem("oob-theme", "dark");
    } else {
      document.body.classList.add("theme-light");
      localStorage.setItem("oob-theme", "light");
    }
  });
}

function setupNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.section;

      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((sec) => sec.classList.remove("is-active"));

      link.classList.add("active");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("is-active");
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // پیش‌فرض داشبورد فعال
  const firstNav = document.querySelector('.nav-link[data-section="dashboard"]');
  if (firstNav) firstNav.classList.add("active");
}

function addChatMessage(container, { from, text, time }) {
  const msgEl = document.createElement("div");
  msgEl.className = "chat-message " + (from === "user" ? "user" : "coach");

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;

  const meta = document.createElement("div");
  meta.className = "chat-meta";
  meta.textContent = from === "user" ? `شما • ${time}` : `${from} • ${time}`;

  msgEl.appendChild(bubble);
  msgEl.appendChild(meta);

  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

function setupCoachChat() {
  const container = document.getElementById("coachMessages");
  const form = document.getElementById("coachForm");
  const input = document.getElementById("coachInput");
  if (!container || !form || !input) return;

  // پیام‌های اولیه
  window.mockChats.coach.forEach((msg) => addChatMessage(container, msg));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    addChatMessage(container, { from: "user", text, time });
    input.value = "";

    // پاسخ خودکار ساده مربی (دمو)
    setTimeout(() => {
      addChatMessage(container, {
        from: "coach",
        text: "خیلی خوب بود، سعی کن امروز حداقل ۵ دقیقه دیگه هم فعالیت سبک داشته باشی 🙌",
        time,
      });
    }, 1200);
  });
}

function setupPublicChat() {
  const container = document.getElementById("publicMessages");
  const form = document.getElementById("publicForm");
  const input = document.getElementById("publicInput");
  if (!container || !form || !input) return;

  window.mockChats.public.forEach((msg) =>
    addChatMessage(container, {
      from: msg.from,
      text: msg.text,
      time: msg.time,
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    addChatMessage(container, {
      from: "شما",
      text,
      time,
    });

    input.value = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupNav();
  window.initCharts && window.initCharts();
  window.initCarousel && window.initCarousel();
  setupCoachChat();
  setupPublicChat();
});
