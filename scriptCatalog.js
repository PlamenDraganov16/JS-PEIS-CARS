let originalOrder = []; 
document.addEventListener("DOMContentLoaded", () => {
    originalOrder = Array.from(document.querySelectorAll(".car")); // will execute after loading
});

function sortCarsByPrice()
{
    let carsContainer = document.querySelector(".carContainer"); // stores the cars
    let sortOrder = document.getElementById("sortPrice").value;

    if (sortOrder === "default") {
        originalOrder.forEach(car => carsContainer.appendChild(car));// adds cars in the container at the place it was 
        return;
    }

    let cars = Array.from(document.querySelectorAll(".car")); //Chooses all cars and makes Array (if not used array.from it returns node list and dont work)

    cars.sort((a,b) => {
        let priceA = parseFloat(a.querySelector(".price").textContent.replace("$", "")); 
        let priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
        return sortOrder === "lowHigh" ? priceA - priceB : priceB - priceA;
    })

    cars.forEach(car => carsContainer.appendChild(car)); // changes the places in the DOM
}

function filterAndSearchCars() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let carTypeFilter = document.getElementById("carFilter").value.toLowerCase();
    let fuelTypeFilter = document.getElementById("fuelFilter").value.toLowerCase();
    let brandTypeFilter = document.getElementById("brandFilter").value.toLowerCase();
    let transTypeFilter = document.getElementById("transmissionFilter").value.toLowerCase();

    // <div class="car" carType=<%= car.type %> fuelType=<% car.fuel %> brandType=<% car.brand %> transType=<% car.transmission %>>

    let cars = originalOrder;

    cars.forEach(car => {
        let carName = car.querySelector(".name").textContent.toLowerCase();
        let carType = car.getAttribute("carType");
        let fuelType = car.getAttribute("fuelType");
        let brandType = car.getAttribute("brandType");
        let transType = car.getAttribute("transmissionType");

        let matchesSearch = searchText === "" || carName.includes(searchText);
        let matchesCarType = carTypeFilter === "all" || carType === carTypeFilter;
        let matchesFuelType = fuelTypeFilter === "all" || fuelType === fuelTypeFilter;
        let matchesBrandType = brandTypeFilter === "all" || brandType === brandTypeFilter;
        let matchesTransType = transTypeFilter === "all" || transType === transTypeFilter;

        if (matchesSearch && matchesCarType && matchesFuelType && matchesBrandType && matchesTransType) {
            car.style.display = "block";
        } else {
            car.style.display = "none";
        }
    });
}

document.getElementById("searchInput").addEventListener("input", filterAndSearchCars);
document.getElementById("carFilter").addEventListener("change", filterAndSearchCars);
document.getElementById("fuelFilter").addEventListener("change", filterAndSearchCars);
document.getElementById("brandFilter").addEventListener("change", filterAndSearchCars);
document.getElementById("transmissionFilter").addEventListener("change", filterAndSearchCars);


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