require('firebase/auth');
import firebase from 'firebase/app';
import { databaseURL, firebaseConfig, authURL } from './api-config';
import { setToken } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = post => {
    const { date, todoValue, dateTime, dateDMY } = post;
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
                complited: false,
                important: false,
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

export const deleteTodo = ({ id, date, dateDMY, dateTime, todoValue }) => {
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const signIn = (email, password) => {
    return fetch ( authURL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    })
        .then( response => response.json())
        .then( result => {
            const token = result.idToken;
            if (token) {
                setToken(token);
                window.location.href = routes.home;
                return token;
            }

        })
        .catch( err => console.log(err));
};

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
