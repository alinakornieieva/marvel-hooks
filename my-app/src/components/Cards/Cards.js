import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import useMarvelService from "../../services/MarvelService"
import Preloader from "../Preloader/Preloader"
import Error from "../Error/Error"
import CardItems from "./CardItems"

const Cards = (props) => {
    const [charList, setCharList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [listEnd, setListEnd] = useState(false)

    const {process, setProcess, getAllCharacters} = useMarvelService()

    useEffect(() => {
        getAllCharacters()
        .then(onFirstCharListLoaded).then(() => setProcess('success'))
    }, [])

    const onFirstCharListLoaded = (newItems) => {
        setCharList([...newItems])
        setNewItemsLoading(false)
        setOffset((offset) => offset + 9)
    }
    const onRequest = (offset) => {
        onCharListLoading()
        setNewItemsLoading(true)
        getAllCharacters(offset).then(onCharListLoaded).then(() => setProcess('success'))
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
        setOffset((offset) => offset + 9)
        setListEnd(ended)
    }
    const setContent = (process) => {
        switch(process) {
            case 'waiting':
            return <Preloader/>
            case 'fetching': 
            return newItemsLoading ? <CardItems listEnd={listEnd} onRequest={onRequest} offset={offset} newItemsLoading={newItemsLoading} data={charList} recieveCharId={props.recieveCharId}/> : <Preloader/> 
            case 'error': 
            return <Error/> 
            case 'success':
            return  <CardItems listEnd={listEnd} onRequest={onRequest} offset={offset} newItemsLoading={newItemsLoading} data={charList} recieveCharId={props.recieveCharId}/>
        }
    }
    return(
        <div className="cards">
            {setContent(process)}
        </div>
)
}

Cards.propTypes = {
    recieveCharId: PropTypes.func
}

export default Cards
