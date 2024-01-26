import { chatGptAPI } from "../../ChatGptAPI/chatGptAPI";
import { messages } from "../../Dialog-context";


const SET_IS_LOADING = "CHAT/GPT/SET_IS_LOADING";
const SET_MESSAGES = "CHAT/GPT/SET_MESSAGES";
const SET_SERVER_ERROR = "CHAT/GPT/SET_SERVER_ERROR";
const SET_SERVER_ERROR_MESSAGE = "CHAT/GPT/SET_SERVER_ERROR_MESSAGE";
const REMOVE_ALL_MESSAGES = "CHAT/GPT/REMOVE_ALL_MESSAGES";



const initialState = {
  messages: [],
  serverErrorMessage: "",
  isServerError: false,
  isLoading: false,
};


export const chatReducer = (state = initialState, action) => {

  switch (action.type) {


    case SET_IS_LOADING:

      return {

        ...state,
        isLoading: action.loading,
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case REMOVE_ALL_MESSAGES:
      return {
        ...state,
        messages: []
      };

    case SET_SERVER_ERROR:
      return {
        ...state,
        isServerError: action.error,
      };

    case SET_SERVER_ERROR_MESSAGE:
      return {
        ...state,
        serverErrorMessage: action.message,
      };

    default:
      return state;
  }
};

//ActionCreator

export const actions = {

  setIsLoading: (loading) =>
  ({
    type: SET_IS_LOADING,
    loading,
  }),

  setMessages: (message) =>
  ({
    type: SET_MESSAGES,
    message
  }),

  removeAllMessages: () =>
  ({
    type: REMOVE_ALL_MESSAGES,
  }),

  setServerError: (error) =>
  ({
    type: SET_SERVER_ERROR,
    error,
  }),

  setServerErrorMessage: (message) =>
  ({
    type: SET_SERVER_ERROR_MESSAGE,
    message,
  }),
};

//thunks


export const addNewMessage = (message) => {


  return async (dispatch) => {
    try {

      dispatch(actions.setIsLoading(true))
      dispatch(actions.setMessages(message))

      const response = await chatGptAPI.sendMessageToGPT(message.text)
      const gptMessage = response.choices[0].message.content;

      dispatch(actions.setMessages({
        text: gptMessage,
        id: response.id,
        userName: 'GPT',
        createdAt: Date.now(),
      }))

      console.log(messages)
      dispatch(actions.setIsLoading(false))
    } catch (error) {
      console.error('Ошибка при запросе к GPT-3:', error);
    }
  }

}





