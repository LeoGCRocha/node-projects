import { useState, useEffect } from "react"
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore"
import { db } from "../firebase/config"

export const useFetchDocuments = (docCollection, search = null, uid = null) =>{

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadData() {
            if (cancelled) return
            setLoading(true)

            const collectionRef = collection(db, docCollection)

            try {

                // busca
                // dashboard

                let q
                if (search) {
                    q = query(collectionRef, 
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    )
                } else if (uid) {
                    q = query(collectionRef, 
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    )
                } else {
                    q = query(collectionRef, orderBy("createdAt", "desc"))
                }
                
                onSnapshot(q, (query) => {
                    setDocuments(query.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })))
                })

                setLoading(false)

            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()

    }, [docCollection, search, uid, cancelled])


    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    })

    return { documents, error, loading }
}
