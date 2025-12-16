let dailyChartInstance = null;
let rangeChartInstance = null;

function initStatsFromData() {
  const { todayGoalMinutes, todayProgressMinutes, streakDays, motivationScore } =
    window.mockActivityData;

  const goalEl = document.getElementById("todayGoalValue");
  const progressEl = document.getElementById("todayProgressValue");
  const percentEl = document.getElementById("todayPercent");
  const streakEl = document.getElementById("streakDays");
  const motivationEl = document.getElementById("motivationScore");
  const progressBar = document.getElementById("todayProgressBar");

  if (!goalEl) return;

  goalEl.textContent = todayGoalMinutes;
  progressEl.textContent = todayProgressMinutes;
  streakEl.textContent = streakDays;
  motivationEl.textContent = motivationScore;

  const percent = Math.min(
    100,
    Math.round((todayProgressMinutes / todayGoalMinutes) * 100)
  );
  percentEl.textContent = percent;
  progressBar.style.width = percent + "%";
}

function initDailyChart() {
  const ctx = document.getElementById("dailyChart");
  if (!ctx) return;

  const { daily } = window.mockActivityData;

  dailyChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: daily.labels,
      datasets: [
        {
          label: "دقیقه فعالیت",
          data: daily.values,
          backgroundColor: "rgba(30, 144, 255, 0.7)",
          borderRadius: 9,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#020617",
          titleColor: "#e5e7eb",
          bodyColor: "#e5e7eb",
        },
      },
      scales: {
        x: {
          ticks: { color: "var(--color-text-soft)", font: { size: 11 } },
          grid: { display: false },
        },
        y: {
          ticks: { color: "var(--color-text-soft)", font: { size: 11 } },
          beginAtZero: true,
          grid: { color: "rgba(148, 163, 184, 0.2)" },
        },
      },
    },
  });
}

function initRangeChart(range = "week") {
  const ctx = document.getElementById("rangeChart");
  if (!ctx) return;

  if (rangeChartInstance) {
    rangeChartInstance.destroy();
  }

  const dataSet =
    range === "week" ? window.mockActivityData.weekly : window.mockActivityData.monthly;

  rangeChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataSet.labels,
      datasets: [
        {
          label: "مجموع دقیقه فعالیت",
          data: dataSet.values,
          borderColor: "rgba(34, 197, 94, 0.9)",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          tension: 0.35,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#020617",
          titleColor: "#e5e7eb",
          bodyColor: "#e5e7eb",
        },
      },
      scales: {
        x: {
          ticks: {
            color: "var(--color-text-soft)",
            font: { size: range === "week" ? 11 : 9 },
            maxRotation: 0,
            autoSkip: true,
          },
          grid: { display: false },
        },
        y: {
          ticks: { color: "var(--color-text-soft)", font: { size: 11 } },
          beginAtZero: true,
          grid: { color: "rgba(148, 163, 184, 0.2)" },
        },
      },
    },
  });
}

function setupRangeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const range = btn.dataset.range;

      tabButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      initRangeChart(range);
    });
  });
}

window.initCharts = function () {
  initStatsFromData();
  initDailyChart();
  initRangeChart("week");
  setupRangeTabs();
};
