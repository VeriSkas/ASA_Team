export const createList = () => {
    const todosContainer = document.querySelector('.content__todo_todosMain');
    const titlePage = document.querySelector('.content__todo_title');
    const createListBtn = document.querySelector('.createListBtn');
    const createListInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList-input');
    const listsUl = document.querySelector('.lists');
    const listLi = document.createElement('li');
    const listA = document.createElement('a');

    createListBtn.onclick = () => {
        todosContainer.innerHTML = null;
        listA.innerHTML = createListInput.value;
        titlePage.innerHTML = createListInput.value;

        listsUl.append(listLi);
        listLi.append(listA);
        createListInput.value = null;
    }
}
