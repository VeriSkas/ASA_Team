import { validPassword, validEmail, validName, inputTodoLength } from './constants/regexp';

export const checkValidPassword = password => password.match(validPassword);

export const checkValidEmail = email => email.match(validEmail);

export const checkValidName = name => name.match(validName);

export const checkLengthTodo  = todo => todo.match(inputTodoLength);
