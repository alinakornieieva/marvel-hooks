import { useCallback, useState } from "react"

export const useHttp = () => {
    const [process, setProcess] = useState('waiting')
    const request = useCallback(async (url, method='GET', body=null, headers={'Content-type': 'Aplication/json'}) => {
        setProcess('fetching')
        try{
            const result = await fetch(url, {method, body, headers})
            if (!result.ok) {
                throw new Error(`Error status is ${result.status}`)
            }
            const data = await result.json()
            return data
        } catch(e) {
            setProcess('error')
            throw e
        }
    }, [])
    const clearError = useCallback(() => setProcess('waiting'), []) 
    return {process, setProcess, request, clearError}

}