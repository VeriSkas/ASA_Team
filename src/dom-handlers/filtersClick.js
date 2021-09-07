import {
    filterComplitedGroupTodos,
    filterImportantGroupTodos,
    sortByTagMain,
    sortByTagUrgent,
    sortDateAscending,
    sortDateDescending,
    sortNameAscending,
    sortNameDescending
} from "../shared/filters";
import { getClickedPage, getSortBtn, setSortBtn } from "../shared/ls-service";
import { filterBtnInLS, pageNameInLS } from "../shared/textInLS";
import { onloadPage } from "./onloadPage";

export const filtersClick = () => {
    const sortByNameAscendingBtn = document.querySelector('#sortByNameAscending');
    const sortByNameDescendingBtn = document.querySelector('#sortByNameDescending');
    const sortByDateAscendingBtn = document.querySelector('#sortByDateAscending');
    const sortByDateDescendingBtn = document.querySelector('#sortByDateDescending');
    const sortByTagMainBtn = document.querySelector('#sortByTagMain');
    const sortByTagUrgentBtn = document.querySelector('#sortByTagUrgent');
    const sortByImportantBtn = document.querySelector('#sortByImportant');
    const sortByComplitedBtn = document.querySelector('#sortByComplited');
    const filterBtn = document.querySelector('.bx.bx-sort-alt-2');
    const filterItem = document.querySelector('.content__todo-filter-sort-ul');

    filterBtn.onclick = () => filterItem.classList.toggle('close');

    sortByNameAscendingBtn.onclick = () => {
        setSortBtn(filterBtnInLS.nameAscendingBtn);
        onloadPage();
    };

    sortByNameDescendingBtn.onclick = () => {
        setSortBtn(filterBtnInLS.nameDescendingBtn);
        onloadPage();
    };

    sortByDateAscendingBtn.onclick = () => {
        setSortBtn(filterBtnInLS.dateAscendingBtn);
        onloadPage();
    };

    sortByDateDescendingBtn.onclick = () => {
        setSortBtn(filterBtnInLS.dateDescendingBtn);
        onloadPage();
    };

    sortByTagMainBtn.onclick = () => {
        setSortBtn(filterBtnInLS.sortByTagMainBtn);
        onloadPage();
    };

    sortByTagUrgentBtn.onclick = () => {
        setSortBtn(filterBtnInLS.sortByTagUrgentBtn);
        onloadPage();
    };

    sortByImportantBtn.onclick = () => {
        setSortBtn(filterBtnInLS.filterImportantBtn);
        onloadPage();
    };

    sortByComplitedBtn.onclick = () => {
        setSortBtn(filterBtnInLS.filterComplitedBtn);
        onloadPage();
    };

    if (getClickedPage() === pageNameInLS.groups) {
        sortByTagMainBtn.style.display = 'none';
        sortByTagUrgentBtn.style.display = 'none';
        sortByImportantBtn.style.display = 'block';
        sortByComplitedBtn.style.display = 'block';
    } else {
        sortByTagMainBtn.style.display = 'block';
        sortByTagUrgentBtn.style.display = 'block';
        sortByImportantBtn.style.display = 'none';
        sortByComplitedBtn.style.display = 'none';
    }
}

export const sortTodoRender = todos => {
    const sortBtnClicked = getSortBtn();

    switch (sortBtnClicked) {
        case filterBtnInLS.nameAscendingBtn:
            return sortNameAscending(todos);

        case filterBtnInLS.nameDescendingBtn:
            return sortNameDescending(todos);

        case filterBtnInLS.dateAscendingBtn:
            return sortDateAscending(todos);

        case filterBtnInLS.dateDescendingBtn:
            return sortDateDescending(todos);

        case filterBtnInLS.sortByTagMainBtn:
            return sortByTagMain(todos);

        case filterBtnInLS.sortByTagUrgentBtn:
            return sortByTagUrgent(todos);

        case filterBtnInLS.filterImportantBtn:
            return filterImportantGroupTodos(todos);

        case filterBtnInLS.filterComplitedBtn:
            return filterComplitedGroupTodos(todos);

        default:
            return todos;
    }
}
