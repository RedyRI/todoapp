const submenuBtn = document.querySelectorAll('.submenu-btn');

function addMenuAnimation () {
  for (let i = 0; i < submenuBtn.length; i++) {
    submenuBtn[i].addEventListener('click', (e) => {
      const submenu = submenuBtn[i].nextElementSibling;
      const arrow = submenuBtn[i].lastElementChild;
      const alto = submenu.scrollHeight;
      arrow.classList.toggle('.desplegar')
      
      if(submenu.classList.contains('desplegar')) {
        submenu.classList.toggle('desplegar')
        submenu.removeAttribute('style')
        arrow.removeAttribute('style')
      } else {
        submenu.classList.toggle('desplegar')
        submenu.style.height = alto + 'px';
        arrow.style.transform = 'rotate(180deg)';
      }

    })
  }
}

export {
  addMenuAnimation,
}