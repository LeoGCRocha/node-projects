import { useState, useEffect } from "react"
import { 
    doc, 
    getDoc,
} from "firebase/firestore"
import { db } from "../firebase/config"

export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadDocument() {
            if (cancelled) return
            setLoading(true)

            try {
                const docRef = doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)
                setDocument(docSnap.data())
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }

        }

        loadDocument()

    }, [docCollection, cancelled, id])


    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    })

    return { document, error, loading }
}
