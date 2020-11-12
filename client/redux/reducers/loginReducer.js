import * as axios from "axios";
import Cookies from 'universal-cookie';

const cookie = new Cookies()
let defaultState = {
    email: '',
    password: '',
    token: cookie.get('token'), //if have cookie use token from them
    user: {},
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
                user: action.user,
                isAuth: true,
                password: ''
            }
        }
        case LOGOUT: {
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
    try {
        let response = await axios.post('/api/v1/auth/user', { email, password }, {
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response)
        if (response.data.token) {
            dispatch({ type: CREATE_TOKEN, token: response.data.token, user: response.data.user })
        }
    } catch (e) {

    }
}

export const AuthorizationThunkCreator = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/authorization')
        if (response.data.token) {
            dispatch({ type: CREATE_TOKEN, token: response.data.token })
        }
    } catch (e) {

    }
}

export const logOutAC = () => ({ type: LOGOUT }) //need clean cookie

export const SecretRoute = () => async (dispatch) => {
    try {
        let response = await axios.get('/api/v1/admin')
        console.log(response)
    } catch (e) {

    }
}

export default loginReducer;