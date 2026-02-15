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

