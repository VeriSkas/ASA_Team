require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';
import { databaseURL, firebaseConfig, authURL } from './api-config';
import { showErrorNotification, showErrorNotificationSignUp } from '../shared/error-handlers';
import { setToken } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = todo => {
    const { title, date, todoValue, dateTime, dateDMY, complited, important } = todo;
    return fetch(
        `${databaseURL}/todos/${title}.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                date,
                todoValue,
                dateDMY,
                dateTime,
                complited,
                important,
            })
        }
    )
        .then( response => response.json())
};

export const getTodos = title => {
    return fetch(
        `${databaseURL}/todos/${title}.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if(result) {
                const tranformedPostsArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))
                return tranformedPostsArr;
            };
        })
};

export const deleteTodo = ({ title, id }) => {
    return fetch(
        `${databaseURL}/todos/${title}/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const updateTodo = ( title, id, complited, important, todoValue, date, dateDMY, dateTime ) => {
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify ({
                title,
                id,
                date,
                todoValue,
                dateDMY,
                dateTime,
                complited,
                important,
            })
        }
    )
        .then(response => response.json())
};

export const createDeleteTodoList = post => {
    const { date, todoValue, dateTime, dateDMY, complited, important } = post;
    return fetch(
        `${databaseURL}/deleteTodos.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                date,
                todoValue,
                dateDMY,
                dateTime,
                complited,
                important,
            })
        }
    )
        .then( response => response.json())
};

export const getDeleteTodolist = () => {
    return fetch(
        `${databaseURL}/deleteTodos.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if(result) {
                const tranformedPostsArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))
                return tranformedPostsArr;
            };
        })
};

export const finalDeleteTodo = ({ id }) => {
    return fetch(
        `${databaseURL}/deleteTodos/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const getTitleLists = () => {
    return fetch(
        `${databaseURL}/todos.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if (result) {
                const tranformedPostsArr = Object.keys(result).map( key => ({
                        ...result[key],
                        titleGroup: key
                    }))

                return tranformedPostsArr;
            };
        })
};

export const signIn = (email, password) => {
    return axios.post(authURL, {
        email,
        password,
        returnSequreToken: true
    })
    .then(response => response)
    .then( result => {
        if(result) {
            const token = result.data.idToken;
            setToken(token);
            window.location.href = routes.home;
            return token;
        }
    })
    .catch(err => showErrorNotification(err))
}

export const signUp = (name, email, password, todoList) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( async (response) => {
            if(response) {
                await fetch (`${databaseURL}/users.json`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        name,
                        email,
                        todoList
                    })
                })
                .then(response => response)

                await signIn(email, password)
            }

    })
    .catch(err => showErrorNotificationSignUp(err))
};
