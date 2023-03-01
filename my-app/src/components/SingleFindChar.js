import { useEffect, useState } from "react"

const SingleFindChar = () => {
    const [charByName, setCharByName] = useState(null)
    const {error, fetching, getCharByName, clearError} = useMarvelService()

    useEffect(() => {
        getCharByName()
    }, [])

    return(
        <div>
            img + description
        </div>
    )
}

//https://gateway.marvel.com:443/v1/public/characters?name=Captain%20Flint&apikey=60697e47be7fb45d5993271fadf4e452
export default SingleFindChar