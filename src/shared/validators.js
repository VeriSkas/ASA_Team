import { REGEXP } from './constants/regexp';

export const checkValidPassword = password => password.match(REGEXP.validPassword);

export const checkValidEmail = email => email.match(REGEXP.validEmail) && !email.match(REGEXP.twoIdenticalSymbols);

export const checkValidName = name => name.match(REGEXP.validName);

export const checkLengthTodo = todo => todo.match(REGEXP.inputTodoLength);

export const checkValidListName =  listName => listName.match(REGEXP.validListName);

export const checkValidSubtask =  subtask => subtask.match(REGEXP.inputTodoLength);

export const checkValidPhotoFormat = photo => photo.match(REGEXP.validFormatsPhoto);

export const checkLengthComment = comment => comment.match(REGEXP.inputCommentLength);
