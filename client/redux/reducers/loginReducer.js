let defaultState = {
    id: null,
    login: null,
    email: null,
    isLogin: false,
    captchaUrl: null
}

const SET_MY_DATA = 'loginReducer/SET_MY_DATA';

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MY_DATA: {
            return {

            }
        }
        default:
            return state;
    }
}

export const setMyDataAC = () => ({
    type: SET_MY_DATA,
    data: {}
})

export default loginReducer;