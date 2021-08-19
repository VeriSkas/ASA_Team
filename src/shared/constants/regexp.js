export const REGEXP = {
    validPassword: /^[a-z0-9а-я]{6,32}$/i,
    validEmail: /^[a-z0-9.!\-_+#%$‘&*/=?^`{|}~]{1,64}@[a-z0-9\-]{1,20}\.[a-z]{2,6}$/i,
    validName: /^[a-z0-9а-я.\-_+#`~]{4,64}$/i,
    inputTodoLength: /^.{3,200}$/si,
    inputCommentLength: /^.{0,200}$/si,
    validListName: /^[a-zа-я0-9]{1,20}$/i,
    twoIdenticalSymbols: /([.!\-_+#%$‘&*/=?^`{|}~])\1{1,}/,
    validFormatsPhoto: /\.(png|jpg|svg|jpeg|bmp|gif)$/i,
    inputEventLength: /^.{1,20}$/i,
}
