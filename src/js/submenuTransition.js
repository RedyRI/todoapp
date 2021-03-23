const submenuBtns = [...document.querySelectorAll('.submenu-btn')];

function addMenuAnimation () {
  submenuBtns.forEach(btn => {
    btn.addEventListener('click', showAndHide)
  })
}

function showAndHide(e) {
  for (let btn of submenuBtns) {
    const submenu = btn.nextElementSibling;
    const arrow = btn.lastElementChild;
    const alto = submenu.scrollHeight;
    if(btn == e.target || e.target == arrow) {
      if(submenu.classList.contains('desplegar')) {
        submenu.classList.toggle('desplegar')
        submenu.removeAttribute('style')
        arrow.removeAttribute('style')
      } else {
        submenu.classList.toggle('desplegar')
        submenu.style.height = alto + 'px';
        arrow.style.transform = 'rotate(180deg)';
      }
    } else {
      if(submenu.classList.contains('desplegar')) {
        submenu.classList.toggle('desplegar')
        submenu.removeAttribute('style')
        arrow.removeAttribute('style')
      }
    }
  }
}


export {
  addMenuAnimation,
}