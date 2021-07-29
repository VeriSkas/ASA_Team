require('firebase/auth');
import firebase from 'firebase/app';
import axios from 'axios';
import { databaseURL, firebaseConfig, authURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { setToken, getUID, setUID } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = todo => {
    const {
        title,
        todoValue,
        comment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = todo;
    return fetch(
        `${databaseURL}/todos/${title}.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                todoValue,
                comment,
                date,
                dateDMY,
                dateTime,
                complited,
                important,
                uuid
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
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};

export const getAllTodos = () => {
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
                const transformedArr = Object.values(result).map(key => Object.values(key)).map(i => {
                    return i;
                });

                return transformedArr;
            };
        })
}

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

export const updateTodo = todo => {
    const {
        id,
        title,
        todoValue,
        comment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = todo;
    return fetch(
        `${databaseURL}/todos/${title}/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify ({
                title,
                todoValue,
                comment,
                date,
                dateTime,
                dateDMY,
                complited,
                important,
                uuid,
                id
            })
        }
    )
        .then(response => response.json())
};

export const createDeleteTodoList = todo => {
    const {
        id,
        title,
        todoValue,
        comment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = todo;
    return fetch(
        `${databaseURL}/deleteTodos.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                todoValue,
                comment,
                date,
                dateTime,
                dateDMY,
                complited,
                important,
                uuid
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
            if (result) {
                const tranformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))
                return tranformedArr;
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

export const createTitleLists = titleList => {
    const { title, uuid } = titleList;
    return fetch( `${databaseURL}/titleLists.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                uuid
            })
        }
    )
        .then( response => response.json())
};

export const getTitleLists = () => {
    return fetch( `${databaseURL}/titleLists.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if (result) {
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};

export const signIn = (email, password) => {
    return axios.post(authURL, {
        email,
        password,
        returnSequreToken: true
    })
        .then( response => response )
        .then( result => {
            if (result) {
                const token = result.data.idToken;
                setToken(token);
                const uid = result.data.localId;
                setUID(uid);
                window.location.href = routes.home;
                return token;
            }
        })
        .catch(err => showErrorNotification(err));
}

export const createAuthData = ( email, password ) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( response => {
            const { uid } = response.user;
            setUID(uid);
        })
}

export const createUser = user => {
    const { loginName, email } = user;
    return axios.post(`${databaseURL}/users.json`, {
        loginName,
        email,
        uuid: getUID()
    })
}

export const signUp = async user => {
    const { loginName, email, password } = user;

    try {
        await createAuthData(email, password);
        await createUser(user);
        await signIn(email, password);
        console.log('+');
    } catch (error) {
        showErrorNotification(error);
    }
};

export const getUser = () => {
    return fetch(
        `${databaseURL}/users.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if(result) {
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};
