export const userPostFetch = user => {
    return dispatch => {
        return fetch('https://book-store-backend.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.token = data.token
                    dispatch(loginUser(data.user))
                    // this.props.history.goBack()
                }
            });
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})


export const userLoginFetch = user => {    
    return dispatch => {
        return fetch('https://book-store-backend.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.token = data.token
                    dispatch(loginUser(data.user))
                    // this.props.history.goBack()
                    // dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data.user}) 
                }
            });
    }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token
        if (token) {
            fetch('https://book-store-backend.herokuapp.com/profile', {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => res.json())
            .then(profileData => {                
                dispatch(loginUser(profileData))
            })
        }
    }
}


export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})








// Fetch categories and set the state
export const fetchCategories = () => dispatch => {
    fetch('https://book-store-backend.herokuapp.com/categories')
        .then(res => res.json())
        .then(categoriesJson => {
            dispatch({ type: "GET_CURRENT_CATEGORIES", categories: categoriesJson})
            
        })
}


// fetch all products
export const fetchProducts = () => dispatch => {
    fetch('https://book-store-backend.herokuapp.com/products')
        .then(res => res.json())
        .then(productsJson => {
            dispatch({ type: "GET_CURRENT_PRODUCTS", products: productsJson})
            
        })
}


// get the product id and fetch for the product
export const grabSingleProduct = (product_id) => dispatch => {
    fetch(`https://book-store-backend.herokuapp.com/${product_id}`)
    .then(res => res.json())
    .then(ProductJson => {
        
        dispatch({ type: "GET_SINGLE_PRODUCT", product: ProductJson})
        
    })
    // dispatch({ type: "GET_SINGLE_PRODUCT", product: singleProduct})
}



// get the id from router and fetch for a Category
export const grabACategory = (category_id) => dispatch => {
    // dispatch({ type: "GET_SINGLE_CATEGORY", category: singleCategory })
    fetch(`https://book-store-backend.herokuapp.com/categories/${category_id}`)
        .then(res => res.json())
        .then(categoryJson => {
            
            dispatch({ type: "GET_SINGLE_CATEGORY", category: categoryJson})
            
        })
}
// GET_SINGLE_CATEGORY


// If there is a current user and the curent order is !null fetch for the order and set state
export const fetchCart = current_user => dispatch => {   
    fetch('https://book-store-backend.herokuapp.com/products')
        .then(res => res.json())
        .then(productsJson => {
            dispatch({ type: "GET_CURRENT_PRODUCTS", products: productsJson})
            
        })
}






// Add to cart action //
export const addToCart = data => dispatch => {
    const userId = data.user.id  
    const currentOrder = data.user.current_order
    const productId = data.product.id
    let quantity = data.quantity        

    if (currentOrder === null) {
        // Create new Order
        const token = localStorage.token


        let config4 = {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                "Authorization": token,
                'Accept':'application/json'
            },
            body: JSON.stringify({user_id: userId, product_id: productId, quantity: quantity})
        }
        
        fetch("https://book-store-backend.herokuapp.com/orders/neworder", config4)
            .then(rsp => rsp.json())
            .then(data => {
                // const order = {...data.order, order_items: data.order_items}
                // dispatch({ type: "NEW_ORDER", cart: order}) 
                dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data}) 
            }) 
    } else {
        const token = localStorage.token

            let config3 = {
                method: "POST",
                headers: {
                'Content-Type':'application/json',
                "Authorization": token,
                'Accept':'application/json'
                },
                body: JSON.stringify({order_id: currentOrder, product_id: productId, quantity: quantity})
            }
            
            fetch("https://book-store-backend.herokuapp.com/order_items", config3)
                .then(rsp => rsp.json())
                .then(data => {
                    // const order = {...data.order, order_items: data.order_items}
                    // dispatch({ type: "NEW_ORDER", cart: data}) 
                    dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data}) 

                }) 
        }

    }


    // Remove an Item from cart
    export const removeFromCart = data => dispatch => {
        const token = localStorage.token
        let config4 = {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
                'Authorization': token,
                'Accept':'application/json'
            }
        }
        
        fetch(`https://book-store-backend.herokuapp.com/order_items/${data}`, config4)
        .then(rsp => rsp.json())
        .then(data => {
            dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data}) 
            // const order = {...data.order, order_items: data.order_items}
            // dispatch({ type: "NEW_ORDER", cart: data}) 
        }) 
        
    }
    
    
    
    export const addShippingAddressToCurrentOrder = data => dispatch => {
        const token = localStorage.token

        let config6 = {
            method: "PATCH",
            headers: {
            'Content-Type':'application/json',
            'Authorization': token,
            'Accept':'application/json'
            },
            body: JSON.stringify({fname: data.fname, 
                                                address: data.address, 
                                                city: data.city,
                                                state: data.state,
                                                zip: data.zip })
        }
        
        fetch(`https://book-store-backend.herokuapp.com/orders/${data.current_order}`, config6)
            .then(rsp => rsp.json())
            .then(data => {
                dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data})
            }) 
    }
        
    
    export const updateShippingRate = data => dispatch => {        
        const token = localStorage.token

        let config6 = {
            method: "PATCH",
            headers: {
            'Content-Type':'application/json',
            'Authorization': token,
            'Accept':'application/json'
            },
            body: JSON.stringify({sh_rate: data.value })
        }
        
        fetch(`https://book-store-backend.herokuapp.com/orders/shipping/${data.current_order}`, config6)
            .then(rsp => rsp.json())
            .then(data => {
                dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data})
            }) 
    }



    export const changeUserCurrentOrderAttToNull = data => dispatch => {
        const token = localStorage.token


        let config7 = {
            method: "PATCH",
            headers: {
            'Content-Type':'application/json',
            'Authorization': token,
            'Accept':'application/json'
            },
            body: JSON.stringify()
        }
        
        fetch(`https://book-store-backend.herokuapp.com/users/order_complete/${data}`, config7)
            .then(rsp => rsp.json())
            .then(data => {
                dispatch({ type: "UPDATE_CURRENT_USER", current_site_user: data})
            }) 

    }