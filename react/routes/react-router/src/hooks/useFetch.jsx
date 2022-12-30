import { useState, useEffect } from 'react'

// custom
export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCall] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [itemId, setItemId] = useState(null)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod("POST")
        } else if (method === "DELETE") {
            setConfig(
                {
                    method,
                    headers: {
                        "Content-type": "application/json"
                    }
                },
            )
            setMethod("DELETE")
            setItemId(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error) {
                setError("Houve algum erro ao carregar os dados!")
            }
            setLoading(false)
        }
        fetchData()
    }, [url, callFetch])

    // refactoring post
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCall(json)
            } else if (method === "DELETE") {
                let fetchOptions = [url + `/${itemId}`, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCall(json)
            }
        }
        httpRequest()
    }, [config, method, url, itemId])

    return { data, httpConfig, loading, error }
}