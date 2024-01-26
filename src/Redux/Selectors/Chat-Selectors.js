
// import { createSelector } from "reselect";


export const getIsLoading = (state) => {
    return state.chat.isLoading
}

export const getServerErrorMessage = (state) => {
    return state.chat.serverErrorMessage
}

export const getIsServerError = (state) => {
    return state.chat.isServerError
}


export const getMessages = (state) => {
    return state.chat.messages
}




//for example reselect-selector
// export const getProducts = createSelector(getIsAuth,(isAuth) => {
//       return isAuth
// })