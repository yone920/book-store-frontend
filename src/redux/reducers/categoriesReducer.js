const initialState = {
    categories: [],
    category: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CURRENT_CATEGORIES':
            // debugger 
            return {...state, categories: action.categories}

        case 'GET_SINGLE_CATEGORY':
            return {...state, category: action.category}
        
        default:
            return state
    }
}