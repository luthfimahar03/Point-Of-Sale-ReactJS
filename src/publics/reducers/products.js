const initState = {
    productList:[],
    errMessage:'',
    message:'',
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

const product = (state = initState, {type, payload}) => {
    switch(type){
        case 'GET_PRODUCTS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_PRODUCTS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: payload.response.data.message
            }
        case 'GET_PRODUCTS_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isFulfilled: true,
                productList: payload.data,
                totalPage: payload.totalPage,
                totalData: payload.totalData,

            }
        
        case 'GET_PRODUCTS_AUTH_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        // case 'GET_PRODUCTS_AUTH_REJECTED':
        //     return{
        //         ...state,
        //         isLoading:false,
        //         isRejected:true,
        //         errMessage: payload.response.data.message
        //     }
        // case 'GET_PRODUCTS_AUTH_FULFILLED':
        //     return{
        //         ...state,
        //         isLoading: false,
        //         isFulfilled: true,
        //         productList: payload
        //     }



        case 'GET_PRODUCT_BY_ID_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'GET_PRODUCT_BY_ID_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: payload.response.data.message
            }
        case 'GET_PRODUCT_BY_ID_FULFILLED':
            // state.productList.push(payload.data.data[0])
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                productList: payload
            }
        case 'ADD_PRODUCTS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'ADD_PRODUCTS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:payload.response.data.message 
            }
        case 'ADD_PRODUCTS_FULFILLED':
            state.productList.unshift(payload.data.data)
            return{ 
                ...state,
                isLoading:false,
                isFulfilled:true
            }
        case 'EDIT_PRODUCTS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'EDIT_PRODUCTS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: payload.response.data.message
            }
        case 'EDIT_PRODUCTS_FULFILLED':
            const newProductData = payload.data.data[0]
            return{
                ...state,
                isLoading:false,
                isFulfilled:true, 
                productList: state.productList.map((products) => {
                    return products.productid === newProductData.productid ? newProductData : products
                })
            } 
        case 'DELETE_PRODUCTS_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'DELETE_PRODUCTS_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:payload.response.data.message
                }
        case 'DELETE_PRODUCTS_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                productList: state.productList.filter((products) => {
                    return products.productid !== payload.data.data.productid
                })
                }
        default:
            return state
    }
}

export default product