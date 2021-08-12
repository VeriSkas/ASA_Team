import moment from 'moment';
import { getTodos, updateTodo } from "../api/api-handlers";
import { getTask, getTodo, getUID, setTodo } from "../shared/ls-service";
import { checkLengthTodo } from '../shared/validators';

export const  handlerComment = async () => {
    const textareaComment = document.querySelector('.content__todoMenu_comment-textarea');
    const todo = getTodo();

    textareaComment.onkeyup = event => {
        if (event.key === 'Enter') {
            if (checkLengthTodo(textareaComment.value)) {
                todo.comment = textareaComment.value;
                todo.dateOfComment = moment().format();

                updateTodo(todo)
                    .then( () => renderComment());
                setTodo(todo);
            }
        }
    }

    textareaComment.onblur = () => {
        if (checkLengthTodo(textareaComment.value)) {
            todo.comment = textareaComment.value;
            todo.dateOfComment = moment().format();

            updateTodo(todo)
                .then( () => renderComment());
            setTodo(todo);
        }
    }
}

export const renderComment = () => {
    const textareaComment = document.querySelector('.content__todoMenu_comment-textarea');
    const commentDateSpan = document.querySelector('.content__todoMenu_comment-date');

    return getTodos()
        .then( todos => {

            if(todos) {
                todos.forEach( item => {
                    const {
                        id,
                        uuid,
                        comment,
                        commentDate,
                    } = item;

                    if ((getUID() === uuid) && (id === getTask()) && comment) {
                        textareaComment.value = comment;
                        commentDateSpan.innerText = `updated on ${moment(commentDate).calendar()}`;
                    } else {
                        textareaComment.value = '';
                    }
                })
            }
        })
}
