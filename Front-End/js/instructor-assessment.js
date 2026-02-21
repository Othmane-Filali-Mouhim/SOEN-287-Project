// for profile menu dropdown.
const menu = document.querySelector(".profile-menu");
const dropdown = document.querySelector(".profile-dropdown");

menu.addEventListener("click", (e) => {
  dropdown.classList.toggle("open");
  e.stopPropagation();
});

document.addEventListener('click', (e) =>{

    if(!menu.contains(e.target)){
        dropdown.classList.remove("open");
    }

});

// ----- Get course by query param -----
const params = new URLSearchParams(window.location.search);
const courseId = params.get("course");

let currentCourse = (courses || []).find(c => c.id === courseId) || (courses || [])[0];

// If no courses exist
if (!currentCourse) {
  document.getElementById("categoriesList").innerHTML = "<p>No courses found in data.js</p>";
  throw new Error("No courses found.");
}

// categories for this course
let categories = currentCourse.assessments || [];

// ----- DOM refs -----
const categoriesList = document.getElementById("categoriesList");
const modal = document.getElementById("categoryModal");
const form = document.getElementById("categoryForm");
const nameInput = document.getElementById("categoryNameInput");
const weightInput = document.getElementById("categoryWeightInput");
const editIdInput = document.getElementById("editCategoryId");
const totalWeightEl = document.getElementById("totalWeight");
const weightWarning = document.getElementById("weightWarning");
const modalTitle = document.getElementById("modalTitle");

// Optional: show course name in header
const headerH1 = document.querySelector(".page-header h1");
if (headerH1) headerH1.textContent = `Assessment Structure — ${currentCourse.code}`;

// ----- Course selector (injected) -----
(function injectCoursePicker() {
  const header = document.querySelector(".page-header");
  if (!header) return;

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "10px";

  const label = document.createElement("span");
  label.textContent = "Course:";

  const select = document.createElement("select");
  select.id = "coursePicker";
  select.style.border = "1px solid #d8e5ff";
  select.style.padding = "6px 10px";
  

  (courses || []).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.code} — ${c.name}`;
    if (c.id === currentCourse.id) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener("change", () => {
    window.location.href = `instructor-assessment.html?course=${encodeURIComponent(select.value)}`;
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  // Put it next to the "Add Category" button area if possible
  header.appendChild(wrapper);
})();
// ----- Helpers -----
function openModalForAdd() {
  modalTitle.textContent = "Add Category";
  form.reset();
  editIdInput.value = "";
  modal.classList.add("show");
}

function openModalForEdit(cat) {
  modalTitle.textContent = "Edit Category";
  editIdInput.value = cat.id;
  nameInput.value = cat.name;
  weightInput.value = cat.weight;
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}


function updateTotalWeight() {
  const total = categories.reduce((sum, c) => sum + Number(c.weightPct || 0), 0);
  totalWeightEl.textContent = total;

  if (total !== 100) {
    weightWarning.textContent = "⚠ Total weight must equal 100%";
    weightWarning.style.color = "#DC2626";
  } else {
    weightWarning.textContent = "✔ Total weight is valid";
    weightWarning.style.color = "#059669";
  }
}

function renderCategories() {
  categoriesList.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.classList.add("category-card");

    card.innerHTML = `
      <div>
        <h4>${cat.name}</h4>
        <p>${cat.weightPct}%</p>
      </div>

      <div>
        <button class="edit-btn" data-id="${cat.id}">Edit</button>
        <button class="delete-btn" data-id="${cat.id}">Delete</button>
      </div>
    `;

    categoriesList.appendChild(card);
  });

  updateTotalWeight();
}

// ----- Events -----
document.getElementById("addCategoryBtn").addEventListener("click", openModalForAdd);

document.getElementById("cancelBtn").addEventListener("click", closeModal);

// SAVE (Add/Edit)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const editId = editIdInput.value;
  const newName = nameInput.value.trim();
  const newWeight = Number(weightInput.value);

  if (editId) {
    // EDIT MODE
    categories = categories.map(cat =>
      cat.id === editId ? { ...cat, name: newName, weight: newWeight } : cat
    );
  } else {
    // ADD MODE
    categories.push({
      id: Date.now().toString(),
      name: newName,
      weight: newWeight
    });
  }

  syncToCourse();
  closeModal();
  renderCategories();
});

// Edit/Delete buttons (delegation)
categoriesList.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("edit-btn")) {
    const cat = categories.find(c => c.id === id);
    if (cat) openModalForEdit(cat);
  }

  if (e.target.classList.contains("delete-btn")) {
    categories = categories.filter(c => c.id !== id);
    syncToCourse();
    renderCategories();
  }
});

// initial render
renderCategories();
