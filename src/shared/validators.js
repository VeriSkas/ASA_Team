import { REGEXP } from './constants/regexp';

export const checkValidPassword = password => password.match(REGEXP.validPassword);

export const checkValidEmail = email => email.match(REGEXP.validEmail);

export const checkValidName = name => name.match(REGEXP.validName);

export const checkLengthTodo = todo => todo.match(REGEXP.inputTodoLength);

export const checkValidListName =  listName => listName.match(REGEXP.validListName);
