require('firebase/auth');
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { databaseURL, firebaseConfig, authURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { setToken, getUID, setUID, getPersonalData, setPersonalData } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';
import { userProfile } from '../dom-handlers/userInfo';
import { refreshPhoto } from '../components/profile/profile_modal';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = async todo => {
    const {
        title,
        todoValue,
        comment,
        dateOfComment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = todo;
    return fetch(
        `${databaseURL}/todos.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                todoValue,
                comment,
                dateOfComment,
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

export const getTodos = async () => {
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
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};

export const deleteTodo = async ({ id }) => {
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const updateTodo = async todo => {
    const {
        id,
        title,
        todoValue,
        comment,
        dateOfComment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = todo;
    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify ({
                title,
                todoValue,
                comment,
                dateOfComment,
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

export const createDeleteTodoList = async todo => {
    const {
        id,
        title,
        todoValue,
        comment,
        dateOfComment,
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
                id,
                title,
                todoValue,
                comment,
                dateOfComment,
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

export const getDeleteTodolist = async () => {
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
                    idDel: key
                }))
                return tranformedArr;
            };
        })
};

export const finalDeleteTodo = async ({ idDel }) => {
    return fetch(
        `${databaseURL}/deleteTodos/${idDel}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const createRecoverTodo = async recoverTodo => {
    const {
        id,
        title,
        todoValue,
        comment,
        dateOfComment,
        date,
        dateTime,
        dateDMY,
        complited,
        important,
        uuid
    } = recoverTodo;
    return fetch(
        `${databaseURL}/todos.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                oldID: id,
                title,
                todoValue,
                comment,
                dateOfComment,
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
}

export const createTitleLists = async titleList => {
    const { title, firstTitle, uuid } = titleList;
    return fetch( `${databaseURL}/todos/titleLists.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                firstTitle,
                uuid
            })
        }
    )
        .then( response => response.json())
};

export const getTitleLists = async () => {
    return fetch( `${databaseURL}/todos/titleLists.json`,
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

export const updateTitleList = async titleList => {
    const { title, uuid, id } = titleList;
    return fetch( `${databaseURL}/todos/titleLists/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title,
                uuid
            })
        }
    )
        .then( response => response.json())
};

export const deleteTitleLists = async ({ id }) => {
    return fetch( `${databaseURL}/todos/titleLists/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const deleteList = async title => {
    return fetch(
        `${databaseURL}/todos/${title}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const createSubtask = async subtask => {
    const {
        title,
        task,
        subTask,
        date,
        complited,
        idTodo,
        uuid
    } = subtask;
    return fetch(
        `${databaseURL}/todos/subtask.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                task,
                subTask,
                date,
                complited,
                idTodo,
                uuid
            })
        }
    )
        .then( response => response.json())
}

export const getSubtask = async () => {
    return fetch(
        `${databaseURL}/todos/subtask.json`,
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
}

export const updateSubtask = async subtask => {
    const {
        title,
        task,
        subTask,
        date,
        idTodo,
        uuid,
        complited,
        id,
    } = subtask;
    return fetch( `${databaseURL}/todos/subtask/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                title,
                task,
                subTask,
                date,
                idTodo,
                uuid,
                complited,
            })
        }
    )
        .then( response => response.json())
}

export const deleteSubTask =  async ({ id }) => {
    return fetch( `${databaseURL}/todos/subtask/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then(response => response.json())
};

export const createEvents = async eventValue => {
    const {
        title,
        start,
        end,
        uuid,
    } = eventValue;
    return fetch(
        `${databaseURL}/events.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                start,
                end,
                uuid,
            })
        }
    )
        .then( response => response.json())
};

export const getEvents = async () => {
    return fetch(
        `${databaseURL}/events.json`,
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

export const signIn = async (email, password) => {
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

export const createAuthData = async ( email, password ) => {
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
    } catch (error) {
        showErrorNotification(error);
    }
};

export const getUser = async () => {
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

export const updateUser = async user => {
    return axios.put(`${databaseURL}/users/${user.id}.json`, user)
        .then( () => {
            setPersonalData(user);
            userProfile();
        })
}

export const passwordRecovery = email => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => window.location.href = routes.signIn_Up)
        .catch(error => showErrorNotification(error))
};

export const uploadPhoto = async (event, imgName) => {
    const user = getPersonalData();

    await firebase
        .storage()
        .ref(`photos/${imgName}`)
        .put(event.target.files[0])
        .catch(error => showErrorNotification(error));
    await firebase
        .storage()
        .ref(`photos/${imgName}`)
        .getDownloadURL()
        .then( url => user.photo = url )
        .catch(error => showErrorNotification(error));
    await updateUser(user)
        .then( () => setPersonalData(user))
        .then( () => refreshPhoto())
        .catch(error => showErrorNotification(error));
}
