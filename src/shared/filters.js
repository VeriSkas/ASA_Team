export const sortNameAscending = todos => {
    const sortNameArr = todos
        .filter(todo => todo.todoValue)
        .sort(( a, b ) => a.todoValue > b.todoValue ? -1 : 1);
    return sortNameArr;
}

export const sortNameDescending = todos => {
    const sortNameArr = todos
        .filter(todo => todo.todoValue)
        .sort(( a, b ) => a.todoValue > b.todoValue ? 1 : -1);
    return sortNameArr;
}

export const sortDateAscending = todos => {
    const sortNameArr = todos
        .filter(todo => todo.date)
        .sort(( a, b ) => a.date > b.date ? -1 : 1);
    return sortNameArr;
}

export const sortDateDescending = todos => {
    const sortNameArr = todos
        .filter(todo => todo.date)
        .sort(( a, b ) => a.date > b.date ? 1 : -1);
    return sortNameArr;
}

export const sortByTagMain = todos => {
    const main = todos
        .filter(todo => todo.tagMain);
    const notMain = todos
        .filter(todo => !todo.tagMain);
    const sortNameArr = notMain.concat(main);

    return sortNameArr;
}

export const sortByTagUrgent = todos => {
    const urgent = todos
        .filter(todo => todo.tagUrgent);
    const notUrgent = todos
        .filter(todo => !todo.tagUrgent);
    const sortNameArr = notUrgent.concat(urgent);

    return sortNameArr;
}

export const searchTaskFilter = (todos, searchValue) => {
    const filterTodos = todos.filter(todo => {
        if(todo.todoValue) {
            const todoValue = todo.todoValue;
            const reg = new RegExp(searchValue, 'gi');
            if (todoValue.match(reg)) {
                return todo;
            }
        }
    });

    return filterTodos;
}

export const filterByTagMain = todos => {
    const main = todos
        .filter(todo => todo.tagMain);
    return main;
}

export const filterByTagUrgent = todos => {
    const urgent = todos
        .filter(todo => todo.tagUrgent);
    return urgent;
}

export const searchUser = (users, searchEmail) => {
    const filterUsers = users.filter(user => {
        if(user.email) {
            const userEmail = user.email;
            const reg = new RegExp( '^' + searchEmail + '$', 'gi');
            if (userEmail.match(reg)) {
                return user;
            }
        }
    });

    return filterUsers;
}
