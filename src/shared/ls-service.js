export const setToken = token => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () =>  localStorage.removeItem('token');

export const setTitleLS = title => localStorage.setItem('title', title);

export const getTitleLS = () => localStorage.getItem('title');

export const removeTitleLS = () =>  localStorage.removeItem('title');

export const getUID = () => localStorage.getItem('uuid');

export const setUID = uid => localStorage.setItem('uuid', uid);

export const clearLS = () => localStorage.clear();

// export const getUserLogin = () => localStorage.getItem('login');

// export const setUserLogin = login => localStorage.setItem('login', login);

// export const getUserEmail = () => localStorage.getItem('email');

// export const setUserEmail = email => localStorage.setItem('email', email);
