import rfdc from "rfdc";
const clone = rfdc()

const LOAD_USERS = "api/users/LOAD_USERS"

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const getUsers = () => async(dispatch) => {
    const response = await fetch(`/api/users/`)
    if(response.ok){
        const users = await response.json()
        console.log(users)
        dispatch(loadUsers(users))
    }
}


const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState = clone(state);
    switch (action.type){
        case LOAD_USERS:
            const newObj = {}
            action.users.users.forEach((user)=>{
                newObj[user.id]=user
            })
            newState=newObj
            return newState
        default:
            return newState
    }
}

export default userReducer
