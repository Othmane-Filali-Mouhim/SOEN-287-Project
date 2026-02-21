document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const selectedRole = document.querySelector('input[name="role"]:checked').value;

  if (selectedRole === "student") {
    window.location.href = "student-dashboard.html";
  } else {
    window.location.href = "instructor-dashboard.html";
  }
});
