import {
    sortByTagMain,
    sortByTagUrgent,
    sortDateAscending,
    sortDateDescending,
    sortNameAscending,
    sortNameDescending
} from "../shared/filters";
import { getSortBtn, setSortBtn } from "../shared/ls-service";
import { filterBtnInLS } from "../shared/textInLS";
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

        default:
            return todos;
    }
}
