document.addEventListener("scroll", function () {
    let content = document.getElementById("scrollContent");
    let position = content.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (position < screenHeight * 0.8) { // When 80% of the element is in view
        content.classList.add("show");
    }
});


// Get the progress bar element
const scrollProgressBar = document.querySelector('.scroll-progress');

// Function to update the progress bar
function updateScrollProgress() {
  // Calculate the total height of the page
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // Calculate the current scroll progress
  const scrollProgress = (window.scrollY / totalHeight) * 100;

  // Update the width of the progress bar
  scrollProgressBar.style.width = scrollProgress + '%';
}

// Add a scroll event listener to update the progress bar
window.addEventListener('scroll', updateScrollProgress);


// Get all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});