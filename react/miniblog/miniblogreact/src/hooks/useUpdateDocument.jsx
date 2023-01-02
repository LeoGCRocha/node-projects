import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

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
        case "UPDATE_DOCUMENT":
            return { loading: false, error: null }
        default:
            return state
    }
}

export const useUpdateDocument = (collectionName) => {

    const [response, dispatch] = useReducer(reducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
        return
    }

    const updateDocument = async (id, data) => {
        checkCancelledBeforeDispatch({
            type: "LOADING",
            payload: updateDocument
        })


        try {
            const docRef = doc(db, collectionName, id)
            const updatedDoc = await updateDoc(docRef, data)


            checkCancelledBeforeDispatch({
                type: "UPDATE_DOCUMENT",
                payload: updatedDoc
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

    return { updateDocument, response }
}