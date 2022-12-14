(() => {
  const hamburgerMenu = document.getElementById("navigation-links-container");
  const hamburgerMenuClose = document.getElementById("hamburger-menu-close");
  const hamburgerMenuOpen = document.getElementById("hamburger-menu-open");
  const hamburgerToggle = document.getElementById("hamburger-toggle");
  const topMenu = document.getElementById("top-navigation-container");

  const allcoffeeTypeTexts =
    document.getElementsByClassName("item-coffee-type");
  const allTotalPrices = document.getElementsByClassName("add-to-cart");
  const allBeanBtns = [...document.getElementsByClassName("bean-coffee-btn")];
  const allGroundBtns = [
    ...document.getElementsByClassName("ground-coffee-btn"),
  ];

  const allChoosenCoffeeTexts = document.getElementsByClassName("item-counter");
  const allSubBtns = [...document.getElementsByClassName("coffee-sub")];
  const allAddBtns = [...document.getElementsByClassName("coffee-add")];

  const toggleMenu = () => {
    /* Togglar mellan de två ikonerna för att öppna respektive stänga hamburgermenyn */
    hamburgerMenu.classList.toggle("hidden-top");
    hamburgerMenuClose.classList.toggle("hidden");
    hamburgerMenuOpen.classList.toggle("hidden");
  };

  let lastKnownYPosition = 0;
  const onMenuOnScroll = () => {
    /* Döljer menyn om man scrollar nedåt och visar den om man är högst upp på sidan eller om man scrollar uppåt.
    Behöver fixa så det inte uppdaterar om man fortsätter trycka - väldigt störigt! */
    if (
      window.innerWidth < 480 &&
      window.pageYOffset &&
      window.pageYOffset > lastKnownYPosition
    ) {
      hamburgerMenu.classList.add("hidden-top");
      hamburgerMenuClose.classList.add("hidden");
      hamburgerMenuOpen.classList.remove("hidden");
      topMenu.classList.add("hidden-top");
    } else {
      topMenu.classList.remove("hidden-top");
    }
    lastKnownYPosition = window.pageYOffset;
  };

  const selectBeans = (isBeans, beanBtn, groundBtn, id) => {
    if (isBeans) {
      groundBtn.classList.remove("btn-selected");
      beanBtn.classList.add("btn-selected");
      console.log(allcoffeeTypeTexts[id]);
      allcoffeeTypeTexts[id].children[0].textContent = beanBtn.outerText;
    } else {
      groundBtn.classList.add("btn-selected");
      beanBtn.classList.remove("btn-selected");
      allcoffeeTypeTexts[id].children[0].textContent = groundBtn.outerText;
    }
  };

  const getId = (e) => {
    return Number(e.target.id.replace(/\D/g, "")) - 1;
  };

  const getBothBtns = (id) => {
    return [allBeanBtns[id], allGroundBtns[id]];
  };

  const changeText = (e) => {
    const id = getId(e);
    const bothBtns = getBothBtns(id);

    if (e.target.outerText.includes("bönor")) {
      selectBeans(true, ...bothBtns, id);
    } else {
      selectBeans(false, ...bothBtns, id);
    }
  };

  const updateCount = (id, value) => {
    const currentValue = Number(allChoosenCoffeeTexts[id].textContent);
    if (currentValue <= 1 && value < 0) return 1;
    allChoosenCoffeeTexts[id].textContent = currentValue + value;
    return currentValue + value;
  };

  const updatePrice = (id, count) => {
    const TOTALPRICE = count * 190;
    const NEW_PRICE_STRING = `  ${TOTALPRICE},00 kr`
    const add_to_cart_button = allTotalPrices[id].children[0]
    add_to_cart_button.textContent = NEW_PRICE_STRING;
  };

  const subItemCount = (e) => {
    const id = getId(e);
    const SUBTRACT_BY_ONE = -1
    const newValue = updateCount(id, SUBTRACT_BY_ONE);
    updatePrice(id, newValue);
  };

  const AddItemCount = (e) => {
    const id = getId(e);
    const ADD_BY_ONE = 1
    const newValue = updateCount(id, ADD_BY_ONE);
    updatePrice(id, newValue);
  };

  document.addEventListener("scroll", onMenuOnScroll);
  hamburgerToggle.addEventListener("click", toggleMenu);

  allSubBtns.forEach((subBtn) => {
    subBtn.addEventListener("click", subItemCount);
  });

  allAddBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", AddItemCount);
  });

  allGroundBtns.forEach((groundBtn) => {
    groundBtn.addEventListener("click", changeText);
  });

  allBeanBtns.forEach((beanBtn) => {
    beanBtn.addEventListener("click", changeText);
  });
})();
