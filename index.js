const hamburgerToggle = document.getElementById("hamburger-toggle")
const hamburgerMenuOpen = document.getElementById("hamburger-menu-open")
const hamburgerMenuClose = document.getElementById("hamburger-menu-close")


const toggleMenu = () => {
  hamburgerMenuOpen.classList.toggle("hidden")
  hamburgerMenuClose.classList.toggle("hidden")
}

const menuToggle = hamburgerToggle.addEventListener("click", toggleMenu)
