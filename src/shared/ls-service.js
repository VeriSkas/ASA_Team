export const setToken = token => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () =>  localStorage.removeItem('token');

export const setTitleLS = title => localStorage.setItem('title', title);

export const getTitleLS = () => localStorage.getItem('title');

export const removeTitleLS = () =>  localStorage.removeItem('title');
