import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { auth } from '../firebase/config'

import { useState, useEffect } from "react";

export const useAutentication = () => {
    const [ error, setError ] = useState(null)
    const [ load, setLoad ] = useState(null)

    // cleanup
    // deal with memory leaks   
    const [ cancelled, setCancelled ] = useState(false)
    
    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    // login - sign in
    const login = async (data) => {
        checkIfIsCancelled()

        setLoad(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoad(false)
        } catch (error) {
            let systemErrorMessage
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado"
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro ao fazer login"
            }
            setLoad(false)
            setError(systemErrorMessage)
        }
    }


    // register
    const createUser = async (data) => {
        setLoad(true)
        setError(null)
        
        checkIfIsCancelled()
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await updateProfile(user, { displayName: data.name })
            setLoad(false)
            return user
        } catch (error) {
            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ter no mínimo 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Este email já está cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro ao criar o usuário"
            }
            setError(systemErrorMessage)
            setLoad(false)
        }

    }
    
    // logout 
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    // avoid memory leak
    useEffect(() => {
        setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        load,
        logout,
        login
    }
}