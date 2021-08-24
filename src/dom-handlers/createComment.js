import moment from 'moment';
import { getTodos, updateTodo } from "../api/api-handlers";
import { getTask, getTodo, getUID, setTodo } from "../shared/ls-service";
import { checkLengthComment } from '../shared/validators';
import { renderTodosAfterUpdate } from './onloadPage';

export const  handlerComment = () => {
    const textareaComment = document.querySelector('.content__todoMenu_comment-textarea');

    textareaComment.onkeyup = event => {
        const todo = getTodo();
        if (event.key === 'Enter') {
            if (checkLengthComment(textareaComment.value.trim())) {
                todo.comment = textareaComment.value;
                todo.dateOfComment = moment().format();

                updateTodo(todo)
                    .then( () => renderComment())
                    .then( () => renderTodosAfterUpdate());
                setTodo(todo);
            }
        }
    }

    textareaComment.onblur = () => {
        const todo = getTodo();
        if (checkLengthComment(textareaComment.value.trim())) {
            todo.comment = textareaComment.value;
            todo.dateOfComment = moment().format();

            updateTodo(todo)
                .then( () => renderComment())
                .then( () => renderTodosAfterUpdate());
            setTodo(todo);
        }
    }
}

export const renderComment = () => {
    const textareaComment = document.querySelector('.content__todoMenu_comment-textarea');
    const commentDateSpan = document.querySelector('.content__todoMenu_comment-date');

    getTodos()
        .then( todos => {

            if(todos) {
                todos.forEach( item => {
                    const {
                        id,
                        uuid,
                        comment,
                        dateOfComment,
                    } = item;

                    if ((getUID() === uuid) && (id === getTask()) && comment) {
                        textareaComment.value = comment;
                        commentDateSpan.innerText = `updated on ${moment(dateOfComment).calendar()}`;
                    } else if ((getUID() === uuid) && (id === getTask()) && !comment) {
                        textareaComment.value = '';
                        commentDateSpan.innerText = '';
                    }
                })
            }
        })
}
