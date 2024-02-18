import { createContext, useState, useContext } from 'react'

// Create a context with a default value
export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

// Create a provider component
export const AuthContextProvider = ({ children }) => {
    // State to manage the value you want to share
    const [ authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null )

    return (
        // Provide the value using the Provider component
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}