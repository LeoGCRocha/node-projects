import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { doc, deleteDoc} from 'firebase/firestore'

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
        case "DELETE_DOCUMENT":
            return { loading: false, error: null }
        default:
            return state
    }
}

export const useDeleteDocument = (collectionName) => {

    const [response, dispatch] = useReducer(reducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
        return
    }

    const deleteDocument = async (id) => {
        checkCancelledBeforeDispatch({
            type: "LOADING",
            payload: deleteDocument
        })

        try {
            const deletedDoc = await deleteDoc(doc(db, collectionName, id))

            checkCancelledBeforeDispatch({
                type: "DELETE_DOCUMENT",
                payload: deletedDoc
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

    return { deleteDocument, response }
}