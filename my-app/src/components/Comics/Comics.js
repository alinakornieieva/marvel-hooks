import { useEffect, useState } from "react"
import useMarvelService from "../../services/MarvelService"
import './Comics.css'
import Error from "../Error/Error"
import Preloader from "../Preloader/Preloader"
import { NavLink } from "react-router-dom"

const Comics = () => {
    const [comicsList, setComicsList] = useState([])
    const [loadingNewItems, setNewItemsLoading] = useState(false)
    const [listEnd, setListEnd] = useState(false)
    const [offset, setOffset] = useState(0)

    const {getComics, error, fetching} = useMarvelService()
    useEffect(() => {
        getComics().then(onFirstComicsLoaded)
    }, [])
    const onFirstComicsLoaded = (comics) => {
        setNewItemsLoading(false)
        setComicsList([...comics])
        setOffset((offset) => offset + 8)
    }
    const loadMore = (offset) => {
        setNewItemsLoading(true)
        getComics(offset).then(onComicsLoaded)
    }
    const onComicsLoaded = (newComicsItems) => {
        let ended = false
        if (newComicsItems.length < 8) {
            ended = true
        }
        setNewItemsLoading(false)
        setComicsList((comicsList) => [...comicsList, ...newComicsItems])
        setOffset((offset) => offset + 8)
        setListEnd(ended)
    }
    const errorMessage = error ? <Error/> : null
    const spinner = fetching && !loadingNewItems ? <Preloader/> : null
    const content = !(errorMessage || spinner) ? <View loadingNewItems={loadingNewItems} listEnd={listEnd} loadMore={() => loadMore(offset)} data={comicsList}/> : null
    return(
        <div >
           {errorMessage}
           {spinner}
           {content}
        </div>
    )
}

const View = (props) => {
    return(
        <>
        <div className="comics-section">
            {props.data.map((item, i) => <div key={i}>
                <NavLink to={`/comics/${item.id}`}>
                <img src={item.img} alt={item.title} />
                </NavLink>
                <div>{item.title}</div>
                <div>{item.price}</div>
            </div> )}
            </div>
            <button 
            style={{display: props.listEnd ? 'none' : 'block'}}
            disabled={props.loadingNewItems}
            onClick={props.loadMore} className="btn-1 comics-btn">LOAD MORE</button>
        </>
    )
}


export default Comics