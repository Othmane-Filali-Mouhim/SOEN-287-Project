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

// for add course popmenu
const addCourseBtn = document.querySelector(".primary-btn")
const popup = document.getElementById("courseFormPopup");
const closeBtn = document.getElementById("closeCourseForm");
const cancelBtn = document.getElementById("cancelCourseForm");

function openForm() {
  popup.classList.remove("hidden");
}
function closeForm(){
    popup.classList.add("hidden");
}


addCourseBtn.addEventListener('click',openForm);
closeBtn.addEventListener('click',closeForm);
cancelBtn.addEventListener('click',closeForm);
