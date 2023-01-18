export const ADD_TOKEN = 'ADD_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const LOGGED_TRUE = 'LOGGED_TRUE';
export const LOGGED_FALSE = 'LOGGED_FALSE';
export const ADD_USER = 'ADD_USER';
export const RECOMMEND_STATE = 'RECOMMEND_STATE';
export const DEPRECATE_STATE = 'DEPRECATE_STATE';
export const CHOICE_STATE = 'CHOICE_STATE';
export const FAVORITE_STATE = 'FAVORITE_STATE';

// 상태를 변경하기 위해 액션을 생성 (액션은 객체여야 한다)
export const addToken = (payload) => {
    return {
        type: ADD_TOKEN,
        payload
    }
}
export const deleteToken = (payload) => {
    return {
        type: DELETE_TOKEN,
        payload
    }
}
export const logIn = () => {
    return {
        type: LOGGED_TRUE,
    }
}
export const logOut = () => {
    return {
        type: LOGGED_FALSE,
    }
}
export const addUser = (payload) => {
    return {
        type: ADD_USER,
        payload
    }
}
export const recommendState = (payload) => {
    return {
        type: RECOMMEND_STATE,
        payload
    }
}
export const deprecateState = (payload) => {
    return {
        type: DEPRECATE_STATE,
        payload
    }
}
export const choiceState = (payload) => {
    return {
        type: CHOICE_STATE,
        payload
    }
}
export const favoriteState = (payload) => {
    return {
        type: FAVORITE_STATE,
        payload
    }
}