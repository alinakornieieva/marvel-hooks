import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useMarvelService from "../../services/MarvelService"
import ComicsBanner from "../ComicsBanner/ComicsBanner"
import Error from "../Error/Error"
import Preloader from "../Preloader/Preloader"

const SinglePage = ({dataType, Component}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {error, fetching, getCharacter, getComic, clearError} = useMarvelService()
    useEffect(() => {
        updateChar()
    }, [id])
    const updateChar = () => {
        clearError()
        switch (dataType) {
            case 'comic': 
            getComic(id).then(onCharLoaded)
            break;
            case 'char': 
            getCharacter(id).then(onCharLoaded)
        }
    }
    const onCharLoaded = (data) => {
        setData(data)
    }
    const errorMessage = error ? <Error/> : null
    const spinner = fetching ? <Preloader/> : null
    const content = !(errorMessage || spinner || !data) ? <Component data={data}/> : null

    return(
        <>
            <ComicsBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage