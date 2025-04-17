import createDataContext from './createDataContext'

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }

}

const signup = () => {
    return ({email, password}) => {

    }
}

const signin = (dispatch) => {
    return () => {

    }
}

const signout = () => {
    return () => {

    }
}
export const {Provider, Context} = createDataContext(
    authReducer,
    { signin, signout, signup},
    {isSignedIn: false}
)