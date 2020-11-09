import * as axios from "axios";

let defaultState = {
    email: '',
    password: '',
    token: '',
    isAuth: false
}

const UPDATE_EMAIL = 'loginReducer/UPDATE_EMAIL';
const UPDATE_PASSWORD = 'loginReducer/UPDATE_PASSWORD';
const CREATE_TOKEN = 'loginReducer/CREATE_TOKEN';
const LOGOUT = 'loginReducer/LOGOUT';

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL: {
            return {
                ...state,
                email: action.email
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                password: action.password
            }
        }
        case CREATE_TOKEN: {
            return {
                ...state,
                token: action.token,
                isAuth: true,
                password: ''
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            return {
                ...state,
                email: '',
                password: '',
                isAuth: false,
            }
        }

        default:
            return state;
    }
}

export const setLoginFieldAC = (email) => ({
    type: UPDATE_EMAIL,
    email
})

export const setPasswordFieldAC = (password) => ({
    type: UPDATE_PASSWORD,
    password
})

export const signInThunkCreator = (email, password) => async (dispatch) => {
    let data = await axios.post('http://localhost:8090/v1/auth/user', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true
    })
    console.log(data)
    if (data.data.token) {
        dispatch({ type: CREATE_TOKEN, token: data.data.token })
        localStorage.setItem('token', data.data.token)
    }
}

export const AuthorizationThunkCreator = () => async (dispatch) => {
    try{let data = await axios.get('http://localhost:8090/v1/authorization', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    if (data.data.token) {
        dispatch({ type: CREATE_TOKEN, token: data.data.token })
        localStorage.setItem('token', data.data.token)
    }} catch(e) {
        localStorage.removeItem('token')
    }
}

export const logOutAC = () => ({ type: LOGOUT })

export default loginReducer;