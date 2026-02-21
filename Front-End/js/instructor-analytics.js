// Instructor Analytics

// Profile dropdown
const menu = document.querySelector(".profile-menu");
const dropdown = document.querySelector(".profile-dropdown");

if (menu && dropdown) {
  menu.addEventListener("click", (e) => {
    dropdown.classList.toggle("open");
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) dropdown.classList.remove("open");
  });
}

const filterSelect = document.getElementById("courseFilter");
const summaryEl = document.getElementById("analyticsSummary");
const rowsEl = document.getElementById("courseStatsRows");

function pctOrDash(x) {
  if (x === null || x === undefined || Number.isNaN(x)) return "--%";
  return `${Math.round(x)}%`;
}

function computeTotals(list) {
  const enabledCourses = list.filter(c => c.enabled !== false);
  const all = enabledCourses.flatMap(c => c.assessments || []);
  const total = all.length;
  const completed = all.filter(a => a.completed).length;

  const completionPct = total === 0 ? 0 : (completed / total) * 100;

  // overall avg weighted
  let weightSum = 0;
  let scoreSum = 0;
  enabledCourses.forEach(c => {
    (c.assessments || []).forEach(a => {
      if (typeof a.gradePct !== "number" || Number.isNaN(a.gradePct)) return;
      const w = Number(a.weightPct);
      if (Number.isNaN(w)) return;
      weightSum += w;
      scoreSum += a.gradePct * w;
    });
  });

  const overallAvg = weightSum === 0 ? null : scoreSum / weightSum;

  return {
    totalCourses: list.length,
    enabledCourses: enabledCourses.length,
    totalAssessments: total,
    completedAssessments: completed,
    completionPct,
    overallAvg
  };
}

function renderFilterOptions() {
  if (!filterSelect) return;

  // reset
  filterSelect.innerHTML = '<option value="all">All courses</option>';

  (courses || []).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.code} — ${c.name}`;
    filterSelect.appendChild(opt);
  });
}

function getFilteredCourses() {
  const v = filterSelect?.value || "all";
  if (v === "all") return courses || [];
  return (courses || []).filter(c => c.id === v);
}

function renderSummary() {
  if (!summaryEl) return;

  const list = getFilteredCourses();
  const t = computeTotals(list);

  summaryEl.innerHTML = `
    <div class="summary-card">
      <p class="label">Courses</p>
      <h2 class="value">${t.enabledCourses}/${t.totalCourses}</h2>
      <p class="hint">Enabled / Total</p>
    </div>

    <div class="summary-card">
      <p class="label">Completion</p>
      <h2 class="value">${pctOrDash(t.completionPct)}</h2>
      <p class="hint">${t.completedAssessments}/${t.totalAssessments} completed</p>
    </div>

    <div class="summary-card">
      <p class="label">Overall Avg</p>
      <h2 class="value">${pctOrDash(t.overallAvg)}</h2>
      <p class="hint">Weighted by assessment weights</p>
    </div>
  `;
}

function renderTable() {
  if (!rowsEl) return;

  const list = getFilteredCourses();

  if (list.length === 0) {
    rowsEl.innerHTML = `<tr><td colspan="5">No courses found.</td></tr>`;
    return;
  }

  rowsEl.innerHTML = list.map(course => {
    const enabled = course.enabled !== false;
    const assessments = course.assessments || [];
    const completed = assessments.filter(a => a.completed).length;
    const avg = window.CourseMate?.computeCourseAverage?.(course);

    return `
      <tr>
        <td>${course.code} — ${course.name}</td>
        <td>${enabled ? "Yes" : "No"}</td>
        <td>${assessments.length}</td>
        <td>${completed}/${assessments.length}</td>
        <td>${pctOrDash(avg)}</td>
      </tr>
    `;
  }).join("");
}

filterSelect?.addEventListener("change", () => {
  renderSummary();
  renderTable();
});

renderFilterOptions();
renderSummary();
renderTable();
