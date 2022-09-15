(() => {
  const hamburgerMenu = document.getElementById("navigation-links-container")
  const hamburgerMenuClose = document.getElementById("hamburger-menu-close")
  const hamburgerMenuOpen = document.getElementById("hamburger-menu-open")
  const hamburgerToggle = document.getElementById("hamburger-toggle")
  const topMenu = document.getElementById("top-navigation-container")


  const toggleMenu = () => {
    /* Togglar mellan de två ikonerna för att öppna respektive stänga hamburgermenyn */
    hamburgerMenu.classList.toggle("hidden")
    hamburgerMenuClose.classList.toggle("hidden")
    hamburgerMenuOpen.classList.toggle("hidden")
  }

  let lastKnownYPosition = 0
  const menuOnScroll = () => {
    /* Döljer menyn om man scrollar nedåt och visar den om man är högst upp på sidan eller om man scrollar uppåt */
    if (window.pageYOffset && window.pageYOffset > lastKnownYPosition) {
      hamburgerMenu.classList.add("hidden")
      hamburgerMenuClose.classList.add("hidden")
      hamburgerMenuOpen.classList.remove("hidden")
      topMenu.classList.add("hidden")
    } else {
      topMenu.classList.remove("hidden")
    }
    lastKnownYPosition = window.pageYOffset
  }

  document.addEventListener("scroll", menuOnScroll)
  hamburgerToggle.addEventListener("click", toggleMenu)

})()
