(() => {
  const hamburgerMenu = document.getElementById("navigation-links-container")
  const hamburgerMenuClose = document.getElementById("hamburger-menu-close")
  const hamburgerMenuOpen = document.getElementById("hamburger-menu-open")
  const hamburgerToggle = document.getElementById("hamburger-toggle")
  const topMenu = document.getElementById("top-navigation-container")

  // const groundCoffeeBtn = document.getElementById("ground-coffee-btn")
  // const beanCoffeeBtn = document.getElementById("bean-coffee-btn")
  const allcoffeeTypeTexts = document.getElementsByClassName("item-coffee-type")
  const allTotalPrices = document.getElementsByClassName("add-to-cart")
  const allBeanBtns = [...document.getElementsByClassName("bean-coffee-btn")]
  const allGroundBtns = [...document.getElementsByClassName("ground-coffee-btn")]

  const allChoosenCoffeeTexts = document.getElementsByClassName("item-counter")
  const allSubBtns = [...document.getElementsByClassName("coffee-sub")]
  const allAddBtns = [...document.getElementsByClassName("coffee-add")]

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

  const selectBeans = (isBeans, beanBtn, groundBtn ) => {
    if (isBeans) {
      groundBtn.classList.remove("btn-selected")
      beanBtn.classList.add("btn-selected")
      allcoffeeTypeTexts[0].children[0].textContent = beanBtn.outerText

    } else {
      groundBtn.classList.add("btn-selected")
      beanBtn.classList.remove("btn-selected")
    allcoffeeTypeTexts[0].children[0].textContent = groundBtn.outerText
    }
  }

  const getId = (e) => {
    return Number(e.target.id.replace(/\D/g, '')) - 1;
  }

  const getBothBtns = (id) => {
    return [allBeanBtns[id], allGroundBtns[id]]
  }

  const changeText = (e) => {
    const id = getId(e)
    const bothBtns = getBothBtns(id)
    if (e.target.outerText.includes("bönor")) {
      selectBeans(true, ...bothBtns)
    } else {
      selectBeans(false, ...bothBtns)
    }
  }

  const updateCount = (id, value) => {
    const currentValue = Number(allChoosenCoffeeTexts[id].textContent)
    if (currentValue <= 1 && value < 0) return 1
    allChoosenCoffeeTexts[id].textContent = currentValue + value
    return currentValue + value
  }

  const updatePrice = (id, count) => {
    const TOTALPRICE = count * 190
    allTotalPrices[id].children[0].textContent = `  ${TOTALPRICE},00 kr`
  }

  const subItem = (e) => {
    const id = getId(e)
    const newValue = updateCount(id, -1)
    updatePrice(id, newValue)
  }
  const AddItem = (e) => {
    const id = getId(e)
    const newValue = updateCount(id, 1)
    updatePrice(id, newValue)
  }

  document.addEventListener("scroll", menuOnScroll)
  hamburgerToggle.addEventListener("click", toggleMenu)

  // groundCoffeeBtn.addEventListener("click", () => {
  //   selectBeans(false)
  // })
  // beanCoffeeBtn.addEventListener("click", (() => {
  //   selectBeans(true)
  // }))

  allSubBtns.forEach(subBtn => {
    subBtn.addEventListener("click", subItem)
  })
  allAddBtns.forEach(addBtn => {
    addBtn.addEventListener("click", AddItem)
  })

  allGroundBtns.forEach(groundBtn => {
    groundBtn.addEventListener("click", changeText)
  })

  allBeanBtns.forEach(beanBtn => {
    beanBtn.addEventListener("click", changeText)
  })
})()
