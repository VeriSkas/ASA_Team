require('firebase/auth');
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { databaseURL, firebaseConfig, authURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { setToken, getUID, setUID, getPersonalData, setPersonalData, getTask, getTodo } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';
import { userProfile } from '../dom-handlers/userInfo';
import { refreshPhoto } from '../components/profile/profile_modal';
import { hideSpiner, showSpiner } from '../dom-handlers/spiner';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

initApi();

export const createTodo = async todo => {
    showSpiner();

    const {
        title,
        todoValue,
        comment,
        tagMain,
        tagUrgent,
        subtask,
        dateOfComment,
        date,
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
                tagMain,
                tagUrgent,
                subtask,
                dateOfComment,
                date,
                complited,
                important,
                uuid
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const getTodos = async () => {
    showSpiner();

    return fetch(
        `${databaseURL}/todos.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
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
    showSpiner();

    return fetch(
        `${databaseURL}/todos/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const updateTodo = async todo => {
    showSpiner();

    const {
        id,
        title,
        todoValue,
        comment,
        tagMain,
        tagUrgent,
        subtask,
        dateOfComment,
        date,
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
                tagMain,
                tagUrgent,
                subtask,
                dateOfComment,
                date,
                complited,
                important,
                uuid,
                id
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const createDeleteTodoList = async todo => {
    showSpiner();

    const {
        id,
        title,
        todoValue,
        comment,
        tagMain,
        tagUrgent,
        subtask,
        dateOfComment,
        date,
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
                tagMain,
                tagUrgent,
                subtask,
                dateOfComment,
                date,
                complited,
                important,
                uuid
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const getDeleteTodolist = async () => {
    showSpiner();

    return fetch(
        `${databaseURL}/deleteTodos.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
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
    showSpiner();

    return fetch(
        `${databaseURL}/deleteTodos/${idDel}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const createRecoverTodo = async recoverTodo => {
    showSpiner();

    const {
        id,
        title,
        todoValue,
        comment,
        tagMain,
        tagUrgent,
        dateOfComment,
        date,
        subtask,
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
                tagMain,
                tagUrgent,
                subtask,
                dateOfComment,
                date,
                complited,
                important,
                uuid
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
}

export const createTitleLists = async titleList => {
    const { title, firstTitle, uuid } = titleList;
    showSpiner();
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
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const getTitleLists = async () => {
    showSpiner();

    return fetch( `${databaseURL}/todos/titleLists.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
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
    showSpiner();

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
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const deleteTitleLists = async ({ id }) => {
    showSpiner();

    return fetch( `${databaseURL}/todos/titleLists/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const deleteList = async title => {
    showSpiner();

    return fetch(
        `${databaseURL}/todos/${title}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const createSubtask = async subtask => {
    showSpiner();
    const todo = getTodo();
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
        `${databaseURL}/todos/${todo.id}/subtask.json`,
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
        .then( response => {
            response.json();
            hideSpiner();
        })
}

export const getSubtask = async todo => {
    showSpiner();
    return fetch(
        `${databaseURL}/todos/${todo.id}/subtask.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
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
    showSpiner();
    const todo = getTodo();
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
    return fetch( `${databaseURL}/todos/${todo.id}/subtask/${id}.json`,
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
        .then( response => {
            response.json();
            hideSpiner();
        })
}

export const deleteSubTask =  async ({ id }) => {
    showSpiner();
    const todo = getTodo();
    return fetch( `${databaseURL}/todos/${todo.id}/subtask/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const createEvents = async eventValue => {
    showSpiner();
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
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const getEvents = async () => {
    showSpiner();
    return fetch(
        `${databaseURL}/events.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
            if(result) {
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};

export const updateEvent = async eventValue => {
    showSpiner();
    const {
        id,
        title,
        start,
        end,
        uuid,
    } = eventValue;
    return fetch( `${databaseURL}/events/${id}.json`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                id,
                title,
                start,
                end,
                uuid,
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
}

export const deleteEvent =  async id => {
    showSpiner();

    return fetch( `${databaseURL}/events/${id}.json`,
        {
            method: 'DELETE',
            headers,
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const createGroup = async group => {
    const { title, creatorUUID, date } = group;
    showSpiner();
    return fetch( `${databaseURL}/todos/groups.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                creatorUUID,
                date
            })
        }
    )
        .then( response => {
            response.json();
            hideSpiner();
        })
};

export const getGroups = async () => {
    showSpiner();

    return fetch( `${databaseURL}/todos/groups.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
            if (result) {
                const transformedArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))

                return transformedArr;
            };
        })
};

export const signIn = async (email, password) => {
    showSpiner();
    return axios.post(authURL, {
        email,
        password,
        returnSequreToken: true
    })
        .then( response => response )
        .then( result => {
            hideSpiner();
            if (result) {
                const token = result.data.idToken;
                setToken(token);
                const uid = result.data.localId;
                setUID(uid);
                window.location.href = routes.home;
                return token;
            }
        })
        .catch(err => {
            showErrorNotification(err);
            hideSpiner();
        });
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

    showSpiner();
    try {
        await createAuthData(email, password);
        await createUser(user);
        await signIn(email, password);
        hideSpiner();
    } catch (error) {
        showErrorNotification(error);
        hideSpiner();
    }
};

export const getUser = async () => {
    showSpiner();

    return fetch(
        `${databaseURL}/users.json`,
        {
            method: 'GET',
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            hideSpiner();
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
    showSpiner();
    return axios.put(`${databaseURL}/users/${user.id}.json`, user)
        .then( () => {
            setPersonalData(user);
            userProfile();
            hideSpiner();
        })
}

export const passwordRecovery = email => {
    showSpiner();

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            hideSpiner();
            window.location.href = routes.signIn_Up;
        })
        .catch(error => {
            showErrorNotification(error);
            hideSpiner();
        })
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
