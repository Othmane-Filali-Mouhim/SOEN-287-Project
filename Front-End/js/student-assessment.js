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


/*   document.querySelector(".courses-accordion").addEventListener("click", (e) => {
    const row = e.target.closest(".course-row");
    if (row) {
      const panel = row.closest(".course-panel");
      const dropdown = panel.querySelector(".course-dropdown");
      dropdown.classList.toggle("hidden");
      return;
    }
  }); */

const params = new URLSearchParams(window.location.search);
const courseId = params.get("course"); // or "course" if you used that
const selectedCourse = courses.find(c => c.id === courseId);


const courseTitleEl = document.getElementById("courseTitle");
const assessmentRowsEl = document.getElementById("assessmentRows");


if (selectedCourse) {
  courseTitleEl.textContent = selectedCourse.code;
} else {
  courseTitleEl.textContent = "No course selected";
}

assessmentRowsEl.innerHTML = selectedCourse.assessments
  .map(a => `
    <tr>
      <td>${a.name}</td>
      <td>${a.due}</td>
      <td>${a.gradePct}</td>
      <td>${a.weightPct}</td>
      <td>${a.completed ? "Completed" : "Pending"}</td>
    </tr>
  `)
  .join("");



  // for add course popmenu
const addAssessmentBtn = document.getElementById("btnAddAssessment");
const editAssessmentBtn = document.getElementById("btnEditAssessment");
const popup = document.getElementById("assessmentFormPopup");
const cancelBtn = document.getElementById("cancelCourseForm"); // your cancel button id

function openForm() {
  popup.classList.remove("hidden");
}

function closeForm() {
  popup.classList.add("hidden");
}

addAssessmentBtn.addEventListener("click", openForm);
editAssessmentBtn.addEventListener("click",openForm);
cancelBtn.addEventListener("click", closeForm);


