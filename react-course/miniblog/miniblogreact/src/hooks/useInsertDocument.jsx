import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        case "INSERT_DOCUMENT":
            return { loading: false, error: null }
        default:
            return state
    }
}

export const useInsertDocument = (collectionName) => {

    const [ response, dispatch ] = useReducer(reducer, initialState)

    // deal with memory leak
    const [ cancelled, setCancelled ] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
        return 
    }

    const insertDocument = async (document) => {
        checkCancelledBeforeDispatch({
            type: "LOADING",
            payload: insertDocument
        })


        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertDocument = await addDoc(collection(db, collectionName), newDocument)

            checkCancelledBeforeDispatch({
                type: "INSERT_DOCUMENT",
                payload: insertDocument
            })

        } catch (error) {

            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return { insertDocument, response }
}