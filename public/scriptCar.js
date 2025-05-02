// FORM BUY JS

function thankUser(event) {
    // event.preventDefault(); 

    let userName = document.getElementById("name").value; 
    let number = document.getElementById("phone").value;

    alert(userName + ", thank you for your order!");
}
document.querySelector(".form1").addEventListener("submit", thankUser);

// FORM REVIEW JS

function addReview(event) {
    // event.preventDefault();

    var userName = document.getElementById("reviewName").value;
    var userRating = document.getElementById("rating").value;
    var userComment = document.getElementById("comment").value.trim(); 

    // if (userName.trim() === "" || userComment === "") {
    //     alert("Please fill in your name and a valid review!");
    // } else {
    //     var testimonialBlock = document.createElement("blockquote");
    //     testimonialBlock.innerHTML = `"${userComment}" - ${userName}, Rating: ${userRating}/5`;
    //     document.querySelector(".testimonials").appendChild(testimonialBlock);

    //     document.getElementById("reviewForm").reset();
    // }
}

document.getElementById("reviewForm").addEventListener("submit", addReview);

// CAROUSEL JS

let currentIndex = 0;
const photos = document.querySelectorAll('.carousel-image');
const wrapper = document.getElementById('carouselWrapper');

function updateCarousel() {

  let offset = 0;
  for (let i = 0; i < currentIndex; i++) {
    offset += photos[i].clientWidth; 
  }

  wrapper.style.transform = `translateX(-${offset}px)`;
}

function nextPhoto() {
  if (currentIndex < photos.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; 
  }
  updateCarousel();
}

function prevPhoto() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = photos.length - 1; 
  }
  updateCarousel();
}

//DARK MODE JS
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