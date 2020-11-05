import * as axios from "axios";

let defaultState = {
    email: '',
    password: '',
    token: ''
}

const UPDATE_EMAIL = 'loginReducer/UPDATE_EMAIL';
const UPDATE_PASSWORD = 'loginReducer/UPDATE_PASSWORD';
const CREATE_TOKEN = 'loginReducer/CREATE_TOKEN'

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
                token: action.token, //need check what we got
                password: '' 
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
    let data = await axios.post('http://localhost:8090/v1/auth/user', { email, password}, {
        headers: { 'Content-Type': 'application/json' }
    })
    console.log(data)
    dispatch({type: CREATE_TOKEN, token: data.data.token}) //need add data.token but now data doesn't have token.
}

export default loginReducer;