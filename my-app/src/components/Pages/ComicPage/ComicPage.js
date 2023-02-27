import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../../services/MarvelService'
import './ComicPage.css'
import Error from '../../Error/Error'
import Preloader from '../../Preloader/Preloader'
import { NavLink } from 'react-router-dom'

const ComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {error, fetching, getComic, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])
    const updateComic = () => {
        clearError()
        getComic(comicId).then(onComicLoaded)
    }
    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    const errorMessage = error ? <Error/> : null
    const spinner = fetching ? <Preloader/> : null
    const content = !(errorMessage || spinner || !comic) ? <View data={comic}/> : null

    return(
        <div className="comic-page">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = (props) => {
    return(
        <>
            <img src={props.data.img} alt="comic" />
            <div>
                <p className="comic-title">{props.data.title}</p>
                <p>{props.data.description}</p>
                <p>{props.data.pageCount}</p>
                <p>Language: {props.data.language}</p>
                <p className="comic-price">{props.data.price}</p>
                <NavLink to='/comics'><div>Back to comics</div></NavLink>
            </div>
        </>
    )
}

export default ComicPage