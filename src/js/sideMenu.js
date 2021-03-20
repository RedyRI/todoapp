const menuContainer = document.createElement('div');
menuContainer.classList.add('menu-container');

let options = ['see all tasks', 'see the categories', 'see the remaining tasks']

function genrateLi(option) {
    return `<li>${option}<span class="span"> + </span></li>`
}

function generateMenu(arr) {
    let content = '<ul>'
    for (let i = 0; i < arr.length; i++) {
        content += genrateLi(arr[i]);
    }
    content += '</ul>';
    return content
}
let menuContent = generateMenu(options);
menuContainer.innerHTML = menuContent;

export {
    menuContainer,
}