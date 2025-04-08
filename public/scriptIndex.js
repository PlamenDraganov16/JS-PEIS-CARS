document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkMode");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "Dark Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "Light Mode";
        }
    });

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode"); // adds new class
        darkModeToggle.textContent = "Dark Mode";
    }
    else {
        darkModeToggle.textContent = "Light Mode";
    }
});


