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

export const sortDateAscending = todos => {  //  по возрастанию такая формула, так как рендерится через prepand
    const sortNameArr = todos
        .filter(todo => todo.date)
        .sort(( a, b ) => a.date > b.date ? -1 : 1);
    return sortNameArr;
}

export const sortDateDescending = todos => {  // по убыванию
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
