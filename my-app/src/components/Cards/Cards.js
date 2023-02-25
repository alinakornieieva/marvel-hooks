import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types'
import MarvelService from "../../services/MarvelService"
import Preloader from "../Preloader/Preloader"
import Error from "../Error/Error"
import CardItems from "./CardItems"

const Cards = (props) => {
    const [charList, setCharList] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [hasError, setError] = useState(false)
    const [offset, setOffset] = useState(210)
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [listEnd, setListEnd] = useState(false)

    const service = new MarvelService()
    useEffect(() => {
        service.getAllCharacters()
        .then(onFirstCharListLoaded).catch(onError)
    }, [])

    const onFirstCharListLoaded = (newItems) => {
        setCharList([...newItems])
        setNewItemsLoading(false)
        setFetching(false)
        setOffset((offset) => offset + 9)
    }
    const onRequest = (offset) => {
        onCharListLoading()
        service.getAllCharacters(offset).then(onCharListLoaded).catch(onError)
    }
    const onCharListLoading = () => {
        setNewItemsLoading(true)
    }
    const onCharListLoaded = (newItems) => {
        let ended = false
        if (newItems.length < 9) {
            ended = true
        }
        setCharList((charList) => [...charList, ...newItems])
        setNewItemsLoading(false)
        setFetching(false)
        setOffset((offset) => offset + 9)
        setListEnd(ended)
    }
    const onError = () => {
        setError(true)
        setFetching(false)
    }
    const loading = isFetching ? <Preloader/> : null
    const error = hasError ? <Error/> : null
    const content = !(loading || error) ? <CardItems listEnd={listEnd} onRequest={onRequest} offset={offset} newItemsLoading={newItemsLoading} data={charList} recieveCharId={props.recieveCharId}/> : null
    return(
        <div className="cards">
            {loading}
            {error}
            {content}
        </div>
    )
}

Cards.propTypes = {
    recieveCharId: PropTypes.func
}

export default Cards
