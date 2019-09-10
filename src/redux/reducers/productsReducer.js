const initialState = []

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CURRENT_PRODUCTS':
            // debugger 
            return action.products

        
        default:
            return state
    }
}