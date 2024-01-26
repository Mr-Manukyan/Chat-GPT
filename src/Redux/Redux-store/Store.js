import { configureStore } from '@reduxjs/toolkit'
import { chatReducer } from '../Reducers/Chat-reducer';

const rootReducer = () => ({
    chat: chatReducer,
})

export const store = configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


window.store = store

export default store