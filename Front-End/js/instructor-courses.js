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

// js/instructor-courses.js
// NOTE: courses comes from data1.js (do NOT redeclare it)

const coursesList = document.getElementById("coursesList");
const modal = document.getElementById("courseModal");
const form = document.getElementById("courseForm");
const editIdInput = document.getElementById("editId");
const idInput = document.getElementById("courseIdInput");
const nameInput = document.getElementById("courseNameInput");
const termInput = document.getElementById("courseTermInput");
const modalTitle = document.getElementById("modalTitle");

// OPEN MODAL
document.getElementById("addCourseBtn").addEventListener("click", () => {
  modalTitle.textContent = "Add Course";
  form.reset();
  editIdInput.value = "";
  modal.classList.add("show");
});

// CLOSE MODAL
document.getElementById("cancelBtn").addEventListener("click", () => {
  modal.classList.remove("show");
});

// SAVE COURSE
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const editId = editIdInput.value;

  if (editId) {
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === editId) {
      courses[i].code = idInput.value;
      courses[i].name = nameInput.value;
      courses[i].term = termInput.value;
      break;
    }
  }
} else {
  courses.push({
    id: Date.now().toString(),
    code: idInput.value,
    name: nameInput.value,
    term: termInput.value,
    enabled: true,
    structure: []
  });
}

  modal.classList.remove("show");
  renderCourses();
});

// RENDER COURSES
function renderCourses() {
  coursesList.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");

    card.innerHTML = `
      <div class="course-info">
        <h3>${course.code} - ${course.name}</h3>
        <p>${course.term}</p>
        <p>Status: ${course.enabled ? "Enabled" : "Disabled"}</p>
      </div>

      <div class="course-actions">
       <button class="secondary-btn edit-btn" data-id="${course.id}" type="button">Edit</button>
<button class="secondary-btn toggle-btn" data-id="${course.id}" type="button">
  ${course.enabled ? "Disable" : "Enable"}
</button>
<button class="danger-btn delete-btn" data-id="${course.id}" type="button">Delete</button>
      </div>
    `;

    coursesList.appendChild(card);
  });
}
  // action
coursesList.addEventListener("click", function (e) {
  // TOGGLE
  const toggleBtn = e.target.closest(".toggle-btn");
  if (toggleBtn) {
    const id = toggleBtn.dataset.id;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === id) {
        courses[i].enabled = !courses[i].enabled;
        break;
      }
    }

    renderCourses();
    return;
  }

  // DELETE
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;

    const ok = confirm("Delete this course?");
    if (!ok) return;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === id) {
        courses.splice(i, 1);
        break;
      }
    }

    renderCourses();
    return;
  }

  // EDIT
  const editBtn = e.target.closest(".edit-btn");
  if (editBtn) {
    const id = editBtn.dataset.id;

    const course = courses.find(c => c.id === id);
    if (!course) return;

    modalTitle.textContent = "Edit Course";
    editIdInput.value = course.id;
    idInput.value = course.code;
    nameInput.value = course.name;
    termInput.value = course.term;

    modal.classList.add("show"); // keep your current css logic
    return;
  }
});

// initial render
renderCourses();
