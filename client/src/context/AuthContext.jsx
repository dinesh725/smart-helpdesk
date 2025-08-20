"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "AUTH_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user)
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token, user: parsedUser },
        })
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch({ type: "AUTH_ERROR" })
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user },
      })

      return { success: true }
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" })
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (name, email, password, role = "user") => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await api.post("/auth/register", { name, email, password, role })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user },
      })

      return { success: true }
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" })
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
