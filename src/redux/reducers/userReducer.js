const initialState = { 
    
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            // debugger 
            return action.payload

        case 'LOGOUT_USER':
            return {}
        
        case 'UPDATE_CURRENT_USER':
            return action.current_site_user

        default:
            return state
    }
}