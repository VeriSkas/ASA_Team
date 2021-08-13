export const setToken = token => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () =>  localStorage.removeItem('token');

export const setTitleLS = title => localStorage.setItem('title', title);

export const getTitleLS = () => localStorage.getItem('title');

export const removeTitleLS = () =>  localStorage.removeItem('title');

export const getUID = () => localStorage.getItem('uuid');

export const setUID = uid => localStorage.setItem('uuid', uid);

export const setTodo = todo => localStorage.setItem('todo', JSON.stringify(todo));

export const getTodo = () => JSON.parse(localStorage.getItem('todo'));

export const setTask = task => localStorage.setItem('task', task);

export const getTask = () => localStorage.getItem('task');

export const clearLS = () => localStorage.clear();

export const setPersonalData = user => localStorage.setItem('PersonalData',JSON.stringify(user));

export const getPersonalData = () => JSON.parse(localStorage.getItem('PersonalData'));

export const setClickedPage = page => localStorage.setItem('clickedPage', page);

export const getClickedPage = () => localStorage.getItem('clickedPage');
