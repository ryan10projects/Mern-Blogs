import { createContext, useReducer } from 'react';

export const blogContext = createContext();

// function to add


export const blogsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOG':
            return { blogs: action.payload }
        case 'ADD_BLOG':
            return { blogs: [action.payload,...state.blogs] }
        case 'DELETE_BLOG':
            return { blogs: state.blogs.filter(blog => blog._id !== action.payload._id) }
        default:
            return state;
    }
}

const BlogContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(blogsReducer, {
        blogs: null
    })

    return(
        <blogContext.Provider value={{...state, dispatch}}>
            {children}
        </blogContext.Provider>

    )

}

export default BlogContextProvider;