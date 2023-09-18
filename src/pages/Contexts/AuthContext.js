import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return { isAuth: true, user: payload.user }
    case "SET_LOGGED_OUT":
      return initialState
    default:
      return state
  }

}

export default function AuthContextProvider(props) {

  const [isAppLoading, setIsAppLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "SET_LOGGED_IN", payload: { user } })
    }
    setTimeout(() => {
      setIsAppLoading(false)
    }, 2000)
  }, [])
  

  return (
    <AuthContext.Provider value={{ isAppLoading, ...state,  dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}


export const useAuthContext = () => useContext(AuthContext) 
