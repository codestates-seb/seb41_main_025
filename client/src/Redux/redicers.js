import { 
    ADD_TOKEN, 
    ADD_USER, 
    DELETE_TOKEN, 
    LOGGED_FALSE, 
    LOGGED_TRUE, 
    RECOMMEND_STATE, 
    DEPRECATE_STATE,
    CHOICE_STATE,
    FAVORITE_STATE } from './action'

// 현재 상태와 액션 객체를 받아 새로운 상태를 리턴하는 함수
const initialState = { tokens: {}, user: {}, isLogin: false, isRecommend:false, isFavorite:false, isChoice:false, isDeprecate:false  }

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state, 
                tokens: {accessToken: action.payload.accessToken}
            }

        case DELETE_TOKEN:
            return {
                ...state, 
                tokens: {accessToken: null}
            }

        case LOGGED_TRUE:
            return {
                ...state,
                isLogin: true
            }

        case LOGGED_FALSE:
            return {
                ...state,
                isLogin: false
            }

        case ADD_USER: 
            return {
                ...state,
                user: action.payload
            }
            
        case RECOMMEND_STATE: 
            return {
                ...state,
                isRecommend : state.isRecommend
            }

        case DEPRECATE_STATE: 
            return {
                ...state,
                isDeprecate: state.isDeprecate
            }

        case CHOICE_STATE: 
            return {
                ...state,
                ischoice : state.isChoice
            }

        case FAVORITE_STATE: 
            return {
                ...state,
                isFavorite : state.isFavorite
            }


        default:
            return initialState;
    }
}