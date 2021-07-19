require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';
import { databaseURL, firebaseConfig, authURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = post => {
    const { date, todoValue, dateTime, dateDMY, complited, important } = post;
    return fetch(
        `${databaseURL}/todos.json`,
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

export const getTodos = () => {
    return fetch(
        `${databaseURL}/todos.json`,
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

export const deleteTodo = ({ id }) => {
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const updateTodo = ( id, complited, important, todoValue, date, dateDMY, dateTime ) => {
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify ({
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

export const signIn = (email, password) => {
    return axios.post(authURL, {
        email,
        password,
        returnSequreToken: true
    })
    .then(response => response)
    .catch(err => showErrorNotification(err))
}

export const signUp = async (name, email, password) => {
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( response => response);

    await fetch (`${databaseURL}/users.json`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name,
            email,
        })
    })
        .then(response => response);

    await signIn(email, password);
};
