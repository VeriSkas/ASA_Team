import {
    sortByTagMain,
    sortByTagUrgent,
    sortDateAscending,
    sortDateDescending,
    sortNameAscending,
    sortNameDescending
} from "../shared/filters";
import { getSortBtn, setSortBtn } from "../shared/ls-service";
import { onloadPage } from "./onloadPage";

export const filtersClick = () => {
    const sortByNameAscendingBtn = document.querySelector('#sortByNameAscending');
    const sortByNameDescendingBtn = document.querySelector('#sortByNameDescending');
    const sortByDateAscendingBtn = document.querySelector('#sortByDateAscending');
    const sortByDateDescendingBtn = document.querySelector('#sortByDateDescending');
    const sortByTagMainBtn = document.querySelector('#sortByTagMain');
    const sortByTagUrgentBtn = document.querySelector('#sortByTagUrgent');
    const filterBtn = document.querySelector('.bx.bx-sort-alt-2');
    const filterItem = document.querySelector('.content__todo-filter-sort-ul');

    filterBtn.onclick = () => filterItem.classList.toggle('close');

    sortByNameAscendingBtn.onclick = () => {
        setSortBtn('NameAscendingBtn');
        onloadPage();
    };

    sortByNameDescendingBtn.onclick = () => {
        setSortBtn('NameDescendingBtn');
        onloadPage();
    };

    sortByDateAscendingBtn.onclick = () => {
        setSortBtn('DateAscendingBtn');
        onloadPage();
    };

    sortByDateDescendingBtn.onclick = () => {
        setSortBtn('DateDescendingBtn');
        onloadPage();
    };

    sortByTagMainBtn.onclick = () => {
        setSortBtn('sortByTagMainBtn');
        onloadPage();
    };

    sortByTagUrgentBtn.onclick = () => {
        setSortBtn('sortByTagUrgentBtn');
        onloadPage();
    };
}

export const sortTodoRender = todos => {
    const sortBtnClicked = getSortBtn();

    switch (sortBtnClicked) {
        case 'NameAscendingBtn':
            return sortNameAscending(todos);

        case 'NameDescendingBtn':
            return sortNameDescending(todos);

        case 'DateAscendingBtn':
            return sortDateAscending(todos);

        case 'DateDescendingBtn':
            return sortDateDescending(todos);

        case 'sortByTagMainBtn':
            return sortByTagMain(todos);

        case 'sortByTagUrgentBtn':
            return sortByTagUrgent(todos);

        default:
            return todos;
    }
}
