import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useMarvelService from "../../services/MarvelService"
import ComicsBanner from "../ComicsBanner/ComicsBanner"
import Error from "../Error/Error"
import Preloader from "../Preloader/Preloader"

const SinglePage = ({dataType, Component}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {process, setProcess, getCharacter, getComic, clearError} = useMarvelService()
    useEffect(() => {
        updateChar()
    }, [id])
    const updateChar = () => {
        clearError()
        switch (dataType) {
            case 'comic': 
            getComic(id).then(onCharLoaded).then(() => setProcess('success'))
            break;
            case 'char': 
            getCharacter(id).then(onCharLoaded).then(() => setProcess('success'))
        }
    }
    const onCharLoaded = (data) => {
        setData(data)
    }
    const setContent = (process, Component, data) => {
        switch(process) {
            case 'fetching': 
            return <Preloader/>
            case 'error': 
            return <Error/> 
            case 'success':
            return <Component data={data}/>
        }
    }
    return(
        <>
            <ComicsBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage