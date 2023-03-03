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

    const {getComics, process, setProcess} = useMarvelService()
    useEffect(() => {
        getComics().then(onFirstComicsLoaded).then(() => setProcess('success'))
    }, [])
    const onFirstComicsLoaded = (comics) => {
        setNewItemsLoading(false)
        setComicsList([...comics])
        setOffset((offset) => offset + 8)
    }
    const loadMore = (offset) => {
        setNewItemsLoading(true)
        getComics(offset).then(onComicsLoaded).then(() => setProcess('success'))
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
    const setContent = (process) => {
        switch(process) {
            case 'waiting':
            return <Preloader/>
            case 'fetching': 
            return loadingNewItems ? <View loadingNewItems={loadingNewItems} listEnd={listEnd} loadMore={() => loadMore(offset)} data={comicsList}/> : <Preloader/> 
            case 'error': 
            return <Error/> 
            case 'success':
            return  <View loadingNewItems={loadingNewItems} listEnd={listEnd} loadMore={() => loadMore(offset)} data={comicsList}/> 
        }
    }
    return(
        <div >
           {setContent(process)}
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