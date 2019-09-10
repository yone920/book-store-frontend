const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'NEW_ORDER':
            return action.cart 
       
        
        default:
            return state
    }
}