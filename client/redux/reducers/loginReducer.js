let defaultState = {
    login: '',
    password: ''
}

const UPDATE_LOGIN = 'loginReducer/UPDATE_LOGIN';
const UPDATE_PASSWORD = 'loginReducer/UPDATE_PASSWORD';

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_LOGIN: {
            return {
                ...state,
                login: action.login
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                password: action.password
            }
        }
        default:
            return state;
    }
}

export const setLoginFieldAC = (login) => ({
    type: UPDATE_LOGIN, 
    login
})

export const setPasswordFieldAC = (password) => ({
    type: UPDATE_PASSWORD, 
    password
})

export default loginReducer;