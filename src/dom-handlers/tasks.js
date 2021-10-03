import { renderTodos } from "./todosRender";
import { setClickedPage, setTitleLS } from '../shared/ls-service';
import { onloadPage } from "./onloadPage";
import { pageNameInLS } from "../shared/textInLS";

export const tasks_render = () => {
    const allTodos = document.querySelector('#nav-links_allTasks');

    allTodos.onclick = () => {
        setTitleLS(pageNameInLS.tasks);
        setClickedPage(pageNameInLS.tasks);
        renderTodos();
        onloadPage();
    }
}
