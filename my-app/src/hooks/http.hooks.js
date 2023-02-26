import { useCallback, useState } from "react"

export const useHttp = (initialValue) => {
    const [error, setError] = useState(null)
    const [fetching, setFetching] = useState(false)
    const request = useCallback(async (url, method='GET', body=null, headers={'Content-type': 'Aplication/json'}) => {
        setFetching(true)
        try{
            const result = await fetch(url, {method, body, headers})
            if (!result.ok) {
                throw new Error(`Error status is ${result.status}`)
            }
            const data = await result.json()
            setFetching(false)
            return data
        } catch(e) {
            setFetching(false)
            setError(e.message)
            throw e
        }
    }, [])
    const clearError = useCallback(() => setError(null), []) 
    return {error, fetching, request, clearError}

}